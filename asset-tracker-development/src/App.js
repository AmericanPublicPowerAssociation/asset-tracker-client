import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';

import AssetDetails from './AssetDetails';
import AssetsGrid from './AssetsGrid';
import AssetsTable from './AssetsTable';
import CircuitDiagram from './CircuitDiagram';
import Map from './Map';
import SearchQuery from './SearchQuery';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  state = {
    all_assets: [],
    connections: [],
    filtered_assets: [],
    selected_asset_index: 0,
  };

  componentDidMount() {
    const url = 'http://localhost:5000/get-assets.json';
    fetch(url)
      .then(res => {
        return res.json();
      }).then(data => {
        const {all_assets, connections} = JSON.parse(data);
        console.log(connections);
        this.setState({
          connections,
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
    const {filtered_assets, all_assets, selected_asset_index} = this.state;
    const selected_asset = all_assets.length > 0 ? all_assets[selected_asset_index] : null;
    return (
      <div className="App">
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">Asset Tracker</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/assets">Assets ({all_assets.length}) </Link></li>
          <li className="nav-item"><a className="nav-link" href="#">Reports (2)</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Alerts (7)</a></li>
        </ul>

        <ul className="navbar-nav mr-2">
          <li className="nav-item"><a className="nav-link" href="#">Alex</a></li>
        </ul>
        <button id="button-sign-out" className="btn btn-primary my-2 my-sm-0" type="submit">Sign Out</button>
      </div>
    </nav>
        <Route exact path="/assets" render={ () => (
          <AssetsTable assets={all_assets}/>
        )} />
        <Route exact path="/" render={ () => (
          <div className="row">
            <div className="col-md-6">
              <Map selected_asset={selected_asset} updateSelected={(selected_asset_index) => this.setState({selected_asset_index})} markers={filtered_assets}/>
            </div>
            <div className="col-md-2">
              <SearchQuery filterAssets={(search_query) => this.filterAssets(search_query)}/>
              <AssetsGrid updateSelected={(selected_asset_index) => this.setState({selected_asset_index})} assets={filtered_assets}/>
            </div>
            <div className="col-md-4">
              <CircuitDiagram selected_asset={selected_asset} updateSelected={(selected_asset_index) => this.setState({selected_asset_index})} assets={all_assets}/>
              <AssetDetails asset={selected_asset}/>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
