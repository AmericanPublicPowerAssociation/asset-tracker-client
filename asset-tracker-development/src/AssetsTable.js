import React, {Component} from 'react';
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import './App.css';


class AssetsTable extends Component {
  state = {
    assets: [],
  }

  componentDidMount() {
    const url = 'http://138.197.69.144:5000/get-assets.json';
    fetch(url)
      .then(res => {
        return res.json();
      }).then(data => {
        const {assets} = JSON.parse(data);
        this.setState({
          assets,
        });
      });
  }

  onGridReady(params) {
    this.gridAPI = params.api;
    this.gridAPI.sizeColumnsToFit();
  }

  render() {
    const columns = [
      { title: "Vendor", field: "vendor"},
      { title: "Product", field: "product"},
      { title: "Version", field: "version"}
    ];
    const {assets} = this.state;

    return (
      <div
        // specify grid theme
        className="ag-theme-balham"
        style={{
          // grid dimensions
          height: "500px",
          width: "100%"
        }}
      >
	<button className='btn btn-primary' onClick={(e) => this.gridAPI.exportDataAsCsv() }>Download</button>
        <AgGridReact
          // agGrid component with config objects
          enableSorting={true}
          enableFilter={true}
          columnDefs={columns}
          onGridReady={this.onGridReady.bind(this)}
	  rowData={assets}
        />
      </div>
    );
  }
}

export default AssetsTable;
