import React, {Component} from 'react';
import { AgGridReact } from "ag-grid-react";
import {Button, Row, Col} from 'react-bootstrap';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import '../css/App.css';


class AssetsTable extends Component {
  componentDidMount() {
    const {loadData} = this.props
    loadData()
  }

  onGridReady(params) {
    this.gridAPI = params.api;
    this.gridAPI.sizeColumnsToFit();
    window.addEventListener("resize", () => this.gridAPI.sizeColumnsToFit());
  }

  render() {
    const columns = [
      { title: "Vendor", field: "vendor"},
      { title: "Product", field: "product"},
      { title: "Version", field: "version"}
    ];
    const {assets} = this.props;

    return (
      <Row>
        <Col lg={12} md={12} sm={18}>
          <div
            // specify grid theme
            className="ag-theme-balham"
            style={
              {
                // grid dimensions
                height: "100rem",
                padding: '30px',
              }
            } >
            <Button bsStyle='primary' onClick={(e) =>
              this.gridAPI.exportDataAsCsv()
            } >Download</Button>
            <AgGridReact
              enableSorting={true}
              enableFilter={true}
              columnDefs={columns}
              onGridReady={this.onGridReady.bind(this)}
              rowData={assets} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default AssetsTable;
