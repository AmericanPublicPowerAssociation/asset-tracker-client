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
    selectedAsset: null,
  };

  render() {
    const {selectedAsset} = this.state;
    return (
      <div className="App">
    <nav className="navbar border-bottom navbar-expand-md navbar-light fixed-top">
      <Link className="navbar-brand" to="/">Asset Tracker</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/assets">Assets</Link></li>
          <li className="nav-item"><Link className="nav-link" to="#">Reports</Link></li>
          <li className="nav-item"><Link className="nav-link" to="#">Alerts</Link></li>
        </ul>

        <ul className="navbar-nav mr-2">
          <li className="nav-item"><Link className="nav-link" to="#">Alex</Link></li>
        </ul>
        <button id="button-sign-out" className="btn btn-primary my-2 my-sm-0" type="submit">Sign Out</button>
      </div>
    </nav>
        <Route exact path="/assets" render={ () => (
          <AssetsTable />
        )} />
        <Route exact path="/" render={ () => (
          <div className="row">
            <div className='col-md-8'>
                  <FilterComponents selectedAsset={selectedAsset} updateSelected={(selectedAsset) => this.setState({selectedAsset})} />
            </div>
            <div className="col-md-4">
              <CircuitDiagram updateSelected={(selectedAsset) => this.setState({selectedAsset})} asset={selectedAsset}/>
              <AssetDetails asset={selectedAsset}/>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
