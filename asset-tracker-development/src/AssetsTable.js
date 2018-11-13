import React, {Component} from 'react';
import {ReactTabulator} from "react-tabulator";

import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import './App.css';


class AssetsTable extends Component {
  state = {
    assets: [], 
  }
  componentDidMount() {
    const url = 'http://localhost:5000/get-assets.json';
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


  render() {
    const columns = [
      { title: "Vendor", field: "vendor"},
      { title: "Product", field: "product"},
      { title: "Version", field: "version"},
    ];
    const {assets} = this.state;

    return (
      <ReactTabulator columns={columns} data={assets} />
    );
  }
}

export default AssetsTable;
