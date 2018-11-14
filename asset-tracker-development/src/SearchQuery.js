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
    filter: false
  };

  componentDidUpdate(prevProps, prevState) {
    const {searchQuery, filter} = this.state;
    const {updateFilteredAssets} = this.props;
    if (filter) {
      fetch(`http://138.197.69.144:5000/search?query=${searchQuery}`)
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
    const {searchQuery} = this.state;
    return (
      <div className='row'>
        <div className="col-md-12 search-div">
          <form onSubmit={(e) => e.preventDefault()}>
            <input onChange={(e) =>
                this.setState({
                  searchQuery: e.target.value
                })} placeholder='search...' value={searchQuery}
                className='search form-control'/>
            <button onClick={(e) => this.setState({filter: true})}
              className='search-btn form-control'><FontAwesomeIcon icon='search' /> </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchQuery;
