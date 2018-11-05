import React, { Component } from 'react';
import Map from './Map';
import AssetsGrid from './AssetsGrid';
import SearchQuery from './SearchQuery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  state = {
    all_assets: [],
    filtered_assets: [],
  };

  componentDidMount() {
    const url = 'http://localhost:5000/get-assets.json';
    fetch(url)
      .then(res => {
        return res.json();
      }).then(data => {
        const all_assets = JSON.parse(data);
        this.setState({
          all_assets,
          filtered_assets: all_assets,
        });
      });
  }

  componentDidUpdate(oldProps, oldState) {
    // if new state is different from old state update db
  }


  filterAssets(search_query) {
    // search for assets
    const {all_assets} = this.state;
    const re = new RegExp(`.*${search_query}.*`, 'i');

    const filtered_assets = all_assets.filter((a) => 
      a.vendor.match(re) || a.product.match(re));
    this.setState({
      filtered_assets
    });
  }

  render() {
    const {filtered_assets} = this.state;
    return (
      <div className="App">
        <h1 className='text-center'>Asset Tracker</h1>
        <div className="row">
          <div className="col-md-8">
            <Map markers={filtered_assets}/>
          </div>
          <div className="col-md-4">
            <SearchQuery filterAssets={(search_query) => this.filterAssets(search_query)}/>
            <AssetsGrid assets={filtered_assets}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
