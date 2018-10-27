import React, { Component } from 'react';
import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class SearchQuery extends Component {
  state = {
    search_query: ''
  };

  render() {
    const {filterAssets} = this.props;
    const {search_query} = this.state;
    return (
      <div className='row'>
        <div className="col-md-12">
          <input onChange={(e) =>
              this.setState({
                search_query: e.target.value
              })} placeholder='search...' value={search_query}
              className='search form-control'/>
          <input onClick={(e) => filterAssets(this.state.search_query)}
            className='search-btn form-control' value='search' type='submit'/>
        </div>
      </div>
    );
  }
}

export default SearchQuery;
