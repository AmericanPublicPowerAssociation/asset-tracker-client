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
    fetch('http://localhost:5000/get-assets.json')
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
    const {all_assets} = this.state;
    if (oldState.all_assets.length !== all_assets.length) {
        console.log('update');
    }
    else {
      const eq = oldState.all_assets.every((asset, index) => all_assets[index].id === asset.id);
      if (!eq) {
        console.log('update');
      }
    }
  }

  /*
    updateCoords(e) {
      const marker = e.target;
      const {lng, lat} = marker.getLngLat();
      const old_asset = this.state.filtered_assets[marker.index];
      const new_filtered_assets = this.state.filtered_assets.map((a, i) => {
        if (a.id === old_asset.id) {
          return {
            ...a,
            lat: lat,
            lng: lng,
          }
        }
        else {
          return a
        }
      })
      const new_assets = this.state.assets.map((a, i) => {
        if (a.id === old_asset.id) {
          return {
            ...a,
            lat: lat,
            lng: lng,
          }
        }
        else {
          return a
        }
      })
      this.setState({
        assets: new_assets,
        filtered_assets: new_filtered_assets
      })
    }
    */

  filterAssets(search_query) {
    // search for assets
    const {all_assets} = this.state;
    const re = new RegExp(`.*${search_query}.*`, 'i');

    const filtered_assets = all_assets.filter((a) => a.vendor.match(re) || a.product.match(re))
    this.setState({
      filtered_assets 
    });
  }

  render() {
    const {filtered_assets, search_query} = this.state
    // updateCoords={(marker) => this.updateCoords(marker)}
    return (
      <div className="App">
        <h1 className='text-center'>Asset Tracker</h1>
        <div className="row">
          <div className="col-md-8">
            <Map markers={filtered_assets} />
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
