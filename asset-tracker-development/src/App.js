import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';

import AssetDetails from './AssetDetails';
import AssetsTable from './AssetsTable';
import CircuitDiagram from './CircuitDiagram';
import FilterComponents from './FilterComponents';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  state = {
    all_assets: [],
    selected_asset_index: 0,
  };

  componentDidMount() {
    const url = 'http://localhost:5000/get-assets.json';
    fetch(url)
      .then(res => {
        return res.json();
      }).then(data => {
        const {all_assets} = JSON.parse(data);
        this.setState({
          all_assets,
        });
      });
  }

  render() {
    const {all_assets, selected_asset_index} = this.state;
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
          <li className="nav-item"><Link className="nav-link" to="#">Reports (2)</Link></li>
          <li className="nav-item"><Link className="nav-link" to="#">Alerts (7)</Link></li>
        </ul>

        <ul className="navbar-nav mr-2">
          <li className="nav-item"><Link className="nav-link" to="#">Alex</Link></li>
        </ul>
        <button id="button-sign-out" className="btn btn-primary my-2 my-sm-0" type="submit">Sign Out</button>
      </div>
    </nav>
        <Route exact path="/assets" render={ () => (
          <AssetsTable assets={all_assets}/>
        )} />
        <Route exact path="/" render={ () => (
          <div className="row">
            <div className='col-md-8'>
              <FilterComponents all_assets={all_assets} selected_asset_index={selected_asset_index} updateSelected={(selected_asset_index) => this.setState({selected_asset_index})} />
            </div>
            <div className="col-md-4">
              <CircuitDiagram selected_asset_id={selected_asset_index} updateSelected={(selected_asset_index) => this.setState({selected_asset_index})} assets={all_assets}/>
              <AssetDetails asset={selected_asset}/>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
