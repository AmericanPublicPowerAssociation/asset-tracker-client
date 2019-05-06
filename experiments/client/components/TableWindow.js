import React, { PureComponent } from 'react'
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { withStyles } from '@material-ui/core/styles'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import TableCell from '@material-ui/core/TableCell'
import { ASSET_TYPE_BY_ID } from '../constants'

const styles = () => ({
  root: {
    height: '100%',
  },
  hover: {
    cursor: 'pointer',
  },
})

class TableWindow extends PureComponent {
  // componentDidMount() {
  //   const { loadData } = this.props
  //   loadData()
  // }
  onGridReady(params) {
    this.gridAPI = params.api;
    this.gridAPI.sizeColumnsToFit();
    window.addEventListener("resize", () => this.gridAPI.sizeColumnsToFit());
  }
  render() {
    const columns = [
      { headerName: "Asset Name", field: "name" },
      { headerName: "Asset Type", field: "typeId" }
    ];
    const {
      // Get local variables
      onSelect,
      // Get global variables
      visibleAssets,
      focusingAssetId,
      setFocusingAsset,
    } = this.props

    return (
      <div
        // specify grid theme
        className="ag-theme-material"
        style={
          {
            // grid dimensions
            height: "100rem",
            padding: '30px',
          }
        } >
        {/* <Button bsStyle='primary' onClick={(e) =>
          this.gridAPI.exportDataAsCsv()
        } >Download</Button> */}

        < AgGridReact
          defaultColDef={{ filter: true, sortable: true }}
          columnDefs={columns}
          onGridReady={this.onGridReady.bind(this)}
          rowData={visibleAssets.toJS()} />
      </div>
    );
  }
}

export default withStyles(styles)(TableWindow);
