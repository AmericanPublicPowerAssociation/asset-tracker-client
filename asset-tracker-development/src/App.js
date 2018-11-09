import React, { Component } from 'react';
import Map from './Map';
import AssetsGrid from './AssetsGrid';
import SearchQuery from './SearchQuery';
import CircuitDiagram from './CircuitDiagram';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';


class App extends Component {
  state = {
    all_assets: [],
    filtered_assets: [],
  };

  componentDidMount() {
    const url = 'http://138.197.69.144:5000/get-assets.json';
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
    const {filtered_assets, all_assets} = this.state;
    return (
      <div className="App">
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="#">Asset Tracker</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><a className="nav-link" href="#">Assets (9,876)</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Reports (2)</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Alerts (7)</a></li>
        </ul>

        <ul className="navbar-nav mr-2">
          <li className="nav-item"><a className="nav-link" href="#">Alex</a></li>
        </ul>
        <button id="button-sign-out" className="btn btn-primary my-2 my-sm-0" type="submit">Sign Out</button>
      </div>
    </nav>
        <div className="row">
          <div className="col-md-6">
            <Map markers={filtered_assets}/>
          </div>
          <div className="col-md-2">
            <SearchQuery filterAssets={(search_query) => this.filterAssets(search_query)}/>
            <AssetsGrid assets={filtered_assets}/>
          </div>
          <div className="col-md-4">
	    <CircuitDiagram assets={all_assets}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
