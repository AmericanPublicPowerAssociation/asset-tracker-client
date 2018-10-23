import React, { Component } from 'react';
import logo from './logo.svg';
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
    const assets = [
      {
        id: 1,
        vendor: "Oli Bob",
        version: "12",
        product: "red",
        delete: false,
      },
      {
        id: 2,
        vendor: "Mary May",
        version: "1",
        product: "green",
        delete: false,
      },
      {
        id: 3,
        vendor: "Christine Lobowski",
        version: "42",
        product: "green",
        delete: false,
      },
      {
        id: 4,
        vendor: "Brendon Philips",
        version: "125",
        product: "red",
        delete: false,
      },
      {
        id: 5,
        vendor: "Margret Marmajuke",
        version: "16",
        product: "yellow",
        delete: false,
      },
      {
        id: 6,
        vendor: "Van Ng",
        version: "37",
        product: "green",
        delete: false,
      },
      {
        id: 7,
        vendor: "Duc Ng",
        version: "37",
        product: "yellow",
        delete: false,
      }
    ];

    this.setState({
      assets,
    });
  }

  componentDidUpdate(oldProps, oldState) {
    // if new state is different from old state update db
    if (oldState.assets.length !== this.state.assets.length) {
      console.log('update');
    }
    else {
      const eq = oldState.assets.every((asset, index) => this.state.assets[index].id === asset.id);
      if (! eq) {
        console.log('update');
      }
    }
  }

  handleDelete(e, row) {
    console.log(this)
    this.deleteRow(row.getIndex())
  }


  render() {
    const columns = [
      { title: "Vendor", editor: "input", field: "vendor", headerFilter: "input"},
      { title: "Product", editor: "input", field: "product", headerFilter: "input"},
      { title: "Version", editor: "input", field: "version"},
      { title: "delete", field:'delete', formatter:'tickCross', cellClick: (e, cell) => {
          console.log('delete row');
          const id = cell._cell.row.data.id;
          console.log(id);
          const assets = this.state.assets.filter((a, i) => a.id !== id);
          console.log(assets)
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
              if (this.state.filtered_assets.length !== rows.length )
                    this.setState({
                      filtered_assets: rows 
                    })
              }
            } dataEdited={(data) => this.setState({data})} columns={columns} data={this.state.assets} />
          </div>
          <div className="col-md-8">
            <Map markers={this.state.assets} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
