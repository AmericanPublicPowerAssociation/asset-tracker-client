import React, { Component } from 'react';
import { ReactTabulator } from "react-tabulator";
import Map from './Map';
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    assets: [],
    filtered_assets: [],
  };

  componentDidMount() {
    const assets = fetch('http://localhost:5000/get-assets.json')
      .then(res => {
        return res.json();
      }).then(data => {
        const assets = JSON.parse(data);
        this.setState({
          assets,
        });
      });
  }

  componentDidUpdate(oldProps, oldState) {
    // if new state is different from old state update db
    if (oldState.assets.length !== this.state.assets.length) {
        console.log('update');
    }
    else {
      const eq = oldState.assets.every((asset, index) => this.state.assets[index].id === asset.id);
      if (!eq) {
        console.log('update');
      }
    }
  }

    updateCoords(e) {
      const marker = e.target;
      const {lng, lat} = marker.getLngLat();
      const old_asset = this.state.filtered_assets[marker.index];
      const new_filtered_assets = this.state.filtered_assets.map((a, i) => {
        if (a.id == old_asset.id) {
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
        if (a.id == old_asset.id) {
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


  render() {
    const columns = [
      { title: "Vendor", editor: "input", field: "vendor", headerFilter: "input"},
      { title: "Product", editor: "input", field: "product", headerFilter: "input"},
      { title: "delete", field:'delete', formatter:'tickCross', cellClick: (e, cell) => {
          const id = cell._cell.row.data.id;
          const assets = this.state.assets.filter((a, i) => a.id !== id);
          this.setState({
            assets
          });
        }
      },
    ];

    return (
      <div className="App">
        <h1>Asset Tracker</h1>
        <div className="row">
          <div className="col-md-4">
            <ReactTabulator dataFiltered={(filters, rows) => {
                if (this.state.filtered_assets.length !== rows.length ) {
                  const filtered_assets = rows.map((r) => r._row.data);
                  this.setState({
                    filtered_assets
                  });
                }
              }
            } dataEdited={(data) => {
              this.setState({data})
            }} columns={columns} data={this.state.assets} />
          </div>
          <div className="col-md-8">
            <Map updateCoords={(marker) => this.updateCoords(marker)} markers={this.state.filtered_assets} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
