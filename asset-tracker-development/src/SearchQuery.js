import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';


library.add(faSearch)

class SearchQuery extends Component {
  state = {
    search_query: ''
  };

  shouldComponentUpdate(prevProps, prevState) {
    const {search_query} = this.state
    return prevState.search_query !== search_query 
  }

  render() {
    const {filterAssets} = this.props;
    const {search_query} = this.state;
    return (
      <div className='row'>
        <div className="col-md-12 search-div">
          <form onSubmit={(e) => e.preventDefault()}>
            <input onChange={(e) =>
                this.setState({
                  search_query: e.target.value
                })} placeholder='search...' value={search_query}
                className='search form-control'/>
            <button onClick={(e) => filterAssets(this.state.search_query)}
              className='search-btn form-control'><FontAwesomeIcon icon='search' /> </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchQuery;
