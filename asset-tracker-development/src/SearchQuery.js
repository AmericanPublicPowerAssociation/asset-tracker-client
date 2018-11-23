import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {Row, ControlLabel, Col, Panel, FormControl, FormGroup} from 'react-bootstrap';

import './SearchBar.css';


library.add(faSearch)


class SearchQuery extends Component {
  /*
   * searchQuery: String => current state of search input box
   * key:         String => current filter being searched
   * search:      String => if a search is triggered
   * filters:     Object => object containing filter values
   *    of the form
   *    {
   *      product: '',
   *      vendor : '',
   *    }
   */
  state = {
    searchQuery: '',
    key: 'product',
    search: false,
    filters: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const {search, filters} = this.state;
    const {updateFilteredAssets} = this.props;
    if (search) {
      const url = Object.entries(filters).reduce((url, f) => {
        return url + `${f[0]}=${f[1]}&`
      }, `http://18.212.1.167:5000/search?`);
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const {filteredAssets} = JSON.parse(data);
        this.setState({
          searchQuery: '',
          search: false
        })
        updateFilteredAssets(filteredAssets);
      })
    }
  }

  shouldComponentUpdate(prevProps, prevState) {
    // only update if this component's state updated (not if parents updated)
    const {searchQuery, key, search} = this.state
    return (prevState.searchQuery !== searchQuery) || (
            prevState.search !== search)           || (
            prevState.key !== key)                 || (
            prevProps.editMode !== this.props.editMode)
  }

  render() {
    const {searchQuery, filters, key} = this.state;
    const {editMode} = this.props;
    const pills = Object.entries(filters).map((f, i) => {
      return (
        <span onClick={(e) =>
            this.setState((state, props) => {
              const {[f[0]]: value, ...newFilters} = state.filters;
              return {
                search: true,
                filters: newFilters
              };
            })
          } key={i} className='filter text-center border'>{f[0]}: {f[1]}
        </span>
      );
    });

    return (
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <div className='filters'>
                {pills}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className='search-div'>
              <form onSubmit={(e) => e.preventDefault()}>
                <FormGroup>
                  { editMode ?  (
                    <FormControl readOnly placeholder={`search by ${key}...`} value={searchQuery}
                      className='search'/>
                  ) : (
                    <FormControl onChange={(e) =>
                        this.setState({
                          searchQuery: e.target.value
                        })
                      } placeholder={`search by ${key}...`}
                      value={searchQuery}
                      className='search'/>
                  )
                  }
                  <FormControl style={editMode ? {cursor: 'not-allowed'}: {}} componentClass='button' onClick={(e) => {
                      if (!editMode) {
                        this.setState((state, props) => {
                          const {filters, key, searchQuery} = state;
                          return {
                            filters: Object.assign({}, filters, {[key]: searchQuery}),
                            search: true
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
                          key: 'product'
                        })
                      }>
                      <Panel.Body>
                        <div style={{display: 'flex'}}>
                          <ControlLabel style={{paddingRight: '10px'}}>
                            Key
                          </ControlLabel>
                          <FormControl componentClass='select' value={key} onChange={(e) =>
                              this.setState({
                                key: e.target.value
                              })
                          }>
                            <option value='vendor'>Vendor</option>
                            <option value='product'>Product</option>
                          </FormControl>
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


export default SearchQuery;
