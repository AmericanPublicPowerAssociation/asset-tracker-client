import React, {Component} from 'react';
import {ReactTabulator} from "react-tabulator";

import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import './App.css';


class AssetsTable extends Component {
  render() {
    const columns = [
      { title: "Vendor", field: "vendor"},
      { title: "Product", field: "product"},
      { title: "Version", field: "version"},
    ];
    const {assets} = this.props;

    return (
      <ReactTabulator columns={columns} data={assets} />
    );
  }
}

export default AssetsTable;
