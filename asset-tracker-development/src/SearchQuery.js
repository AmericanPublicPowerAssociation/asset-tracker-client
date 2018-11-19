import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {Row, ControlLabel, Col, Panel, FormControl, FormGroup} from 'react-bootstrap';

import './SearchBar.css';


library.add(faSearch)

class SearchQuery extends Component {
  state = {
    searchQuery: '',
    key: 'product',
    filter: false,
    filters: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const {filter, filters} = this.state;
    const {updateFilteredAssets} = this.props;
    if (filter) {
      const url = Object.entries(filters).reduce((url, f) => {
        return url + `${f[0]}=${f[1]}&`
      }, `http://18.212.1.167:5000/search?`);
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const {filteredAssets} = JSON.parse(data);
        this.setState({
          searchQuery: '',
          filter: false
        })
        updateFilteredAssets(filteredAssets);
      })
    }
  }

  shouldComponentUpdate(prevProps, prevState) {
    const {searchQuery, filter} = this.state
    return (prevState.searchQuery !== searchQuery) || (
        prevState.filter !== filter)
  }

  render() {
    const {searchQuery, filters, key} = this.state;
    const pills = Object.entries(filters).map((f, i) => {
      const {[f[0]]: value, ...newFilters} = filters;
      return (
        <span onClick={(e) => {
          this.setState({
            filter: true,
            filters: newFilters
          })
        }} key={i} style={{backgroundColor: 'red', borderRadius: '25px', padding: '10px'}} className='filter text-center border'>{f[0]}: {f[1]}</span>
      );
    })
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
                  <FormControl onChange={(e) =>
                      this.setState({
                        searchQuery: e.target.value
                      })} placeholder='search...' value={searchQuery}
                      className='search'/>
                  <FormControl componentClass='button' onClick={(e) => this.setState((state, props) => {
                    const {filters, key, searchQuery} = state;
                    return {
                      filters: Object.assign(filters, {[key]: searchQuery}),
                      filter: true
                    }
                  })}
                    className='search-btn'><FontAwesomeIcon icon='search' /> </FormControl>


                  <Panel>
                    <Panel.Heading>
                      <Panel.Title toggle>
                        Filter Search
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                      <Panel.Body>
                          <div style={{display: 'flex'}}>
                            <ControlLabel style={{paddingRight: '10px'}}>
                              Key
                            </ControlLabel>
                              <FormControl componentClass='select' defaultValue={key} onChange={(e) => {
                                  this.setState({
                                    key: e.target.value
                                  })
                              }}>
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
