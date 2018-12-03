import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {Row, ControlLabel, Col, Panel, FormControl, FormGroup} from 'react-bootstrap';

import '../css/SearchBar.css';


library.add(faSearch)


class SearchQuery extends Component {
  /*
   * searchQuery: String => current state of search input box
   * key:         String => current filter being searched
   * type_id:         String => filter (type of asset being searched)
   * searchToggle:      Boolean => if a search is triggered
   * filters:     Object => object containing filter values
   *    of the form
   *    {
   *      product: '',
   *      vendor : '',
   *      type_id: '',
   *    }
   */
  state = {
    searchQuery: '',
    key: 'product',
    type_id: '0',
    searchToggle: false,
    filters: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const {searchToggle, filters} = this.state;
    const {searchAssets, updateSelected} = this.props;
    if (searchToggle !== prevState.searchToggle) {
      updateSelected({})
      searchAssets(filters);
    }
  }


  render() {
    const {searchQuery, type_id, filters, key} = this.state;
    const {editMode} = this.props;
    const types = ['Other', 'Pole', 'Meter', 'Line', 'Switch', 'Busbar', 'Transformer', 'Substation', 'Station']
    const options = (
        <FormControl componentClass='select' value={type_id} onChange={(e) =>
            this.setState({
              type_id: e.target.value
            })
        }>
          { types.map((t, i) => <option key={i} value={i}>{t}</option>) }
        </FormControl>
    )
    const pills = Object.entries(filters).map((f, i) => {
      const key = f[0]
      const value = key === 'type_id' ? types[parseInt(f[1])] : f[1];
      return (
        <span style={{margin: '10px'}} onClick={(e) =>
            this.setState((state, props) => {
              const {[key]: val, ...newFilters} = state.filters;
              return {
                searchToggle: !state.searchToggle,
                filters: newFilters
              };
            })
          } key={i} className='filter text-center border'>{key}: {value}
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
                          const {filters, type_id, key, searchQuery} = state;
                          return {
                            filters: Object.assign({}, filters, {[key]: searchQuery, type_id: type_id}),
                            searchToggle: !state.searchToggle
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
                          key: 'product',
                          type_id: '0',
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


export default SearchQuery;
