import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class SearchQuery extends Component {
  state = {
    search_query: ''
  };


  render() {
    const {filterAssets} = this.props;
    const {search_query} = this.state;
    // updateCoords={(marker) => this.updateCoords(marker)}
    return (
    <div className='row'>
      <div className="col-md-12">
        <input onChange={(e) => this.setState({search_query: e.target.value})} placeholder='search for assets...' value={search_query} className='form-control'/>
        <input onClick={(e) => filterAssets(this.state.search_query)} className='form-control' value='search' type='submit'/>
      </div>
    </div>
    );
  }
}

export default SearchQuery;
