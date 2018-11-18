import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className='row'>
        <div className="col-lg-12">
          <div className='row'>
            <div className="col-lg-12">
              <div className='filters'>
                {pills}
                <hr/>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-12 search-div">
              <form onSubmit={(e) => e.preventDefault()}>
                <input onChange={(e) =>
                    this.setState({
                      searchQuery: e.target.value
                    })} placeholder='search...' value={searchQuery}
                    className='search form-control'/>
                <button onClick={(e) => this.setState((state, props) => {
                  const {filters, key, searchQuery} = state;
                  return {
                    filters: Object.assign(filters, {[key]: searchQuery}),
                    filter: true
                  }
                })}
                  className='search-btn form-control'><FontAwesomeIcon icon='search' /> </button>

                <div className="card">
                  <div id='filterDiv'>
                    <div className="card-header" id="heading">
                      <h5 className="mb-0">
                        <button className="btn text-center btn-link" data-toggle="collapse" data-target="#filterSearch" aria-expanded="true" aria-controls="filterSearch">
                          Filter Search
                        </button>
                      </h5>
                    </div>

                    <div id="filterSearch" className="collapse" aria-labelledby="heading" data-parent="#filterDiv">
                      <div style={{display: 'flex'}}className="card-body">
                        <label style={{paddingRight: '10px'}}>
                          Key
                        </label>
                          <select defaultValue={key} className="form-control" onChange={(e) => {
                              this.setState({
                                key: e.target.value
                              })
                          }}>
                            <option value='vendor'>Vendor</option>
                            <option value='product'>Product</option>
                          </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchQuery;
