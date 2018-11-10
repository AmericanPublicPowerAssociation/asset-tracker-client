import React, { Component } from 'react';
import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


library.add(faSearch)
class SearchQuery extends Component {
  state = {
    search_query: ''
  };

  render() {
    const {filterAssets} = this.props;
    const {search_query} = this.state;
    return (
      <div className='row'>
        <div className="col-md-12 search-div">
          <input onChange={(e) =>
              this.setState({
                search_query: e.target.value
              })} placeholder='search...' value={search_query}
              className='search form-control'/>
          <button onClick={(e) => filterAssets(this.state.search_query)}
            className='search-btn form-control'><FontAwesomeIcon icon='search' /> </button>
        </div>
      </div>
    );
  }
}

export default SearchQuery;
