class SearchQuery extends Component {
  /*
   * query: String => current state of search input box
   * searchToggle:      Boolean => if a search is triggered
   * type_ids:     Array => list of type_ids to filter for
   */
  state = {
    query: '',
    searchTerm: '',
    searchToggle: false,
    type_ids: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const {searchToggle, searchTerm, type_ids} = this.state;
    const {searchAssets, updateSelected} = this.props;
    if (searchToggle !== prevState.searchToggle || type_ids.length !== prevState.type_ids.length || (type_ids.length > 0 && type_ids.some((t, i) => t !== prevState.type_ids[i]))) {
      updateSelected({})
      searchAssets({name: searchTerm, type_ids: type_ids});
    }
  }


  render() {
    const {query, searchTerm} = this.state;
    const {editMode} = this.props;
    const types = ['Other', 'Pole', 'Meter', 'Line', 'Switch', 'Busbar', 'Transformer', 'Substation', 'Station']
    const options = (
        <FormGroup onChange={(e) => {
            // get list of selected checks
            const type_id_checkbox = e.target;
            this.setState((state, props) => {
              return {
                type_ids:  type_id_checkbox.checked? state.type_ids.concat([type_id_checkbox.value]) : state.type_ids.filter((t) => t !== type_id_checkbox.value)
              }
            })
        }}>
          { types.map((t, i) => <Checkbox key={i} value={i}>{t}</Checkbox>) }
        </FormGroup>

    )

    return (
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h2>Search: "{ searchTerm }" </h2>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className='search-div'>
              <form onSubmit={(e) => e.preventDefault()}>
                <FormGroup>
                  { editMode ?  (
                    <FormControl readOnly placeholder={`search by name...`} value={query}
                      className='search'/>
                  ) : (
                    <FormControl onChange={(e) =>
                        this.setState({
                          query: e.target.value
                        })
                      } placeholder={`search by name...`}
                      value={query}
                      className='search'/>
                  )
                  }
                  <FormControl style={editMode ? {cursor: 'not-allowed'}: {}} componentClass='button' onClick={(e) => {
                      if (!editMode) {
                        this.setState((state, props) => {
                          const {searchToggle, query} = state;
                          return {
                            searchTerm: query.trim(),
                            searchToggle: !searchToggle
                          }
                        })
                      }
                  }}
                    className='search-btn'><FontAwesomeIcon icon='search' /> </FormControl>

                  <Panel>
                    <Panel.Heading>
                      <Panel.Title toggle>
                        Filter Search
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse onExited={(e) =>
                        this.setState({
                          type_ids: [],
                        })
                      }>
                      <Panel.Body>
                        <div style={{display: 'flex'}}>
                          <ControlLabel style={{paddingLeft: '10px', paddingRight: '10px'}}>
                            Type
                          </ControlLabel>
                          { options }
                        </div>
                      </Panel.Body>
                    </Panel.Collapse>
                  </Panel>
                </FormGroup>
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
