import React, { forwardRef } from 'react'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { useSelector } from 'react-redux'
import {
  getOverlayMode,
  getSelectedAssetId,
  getSelectedTaskId,
} from '../selectors'
import {
  getSelectedRiskIndex,
} from 'asset-report-risks'

const TABLE_ICONS = {
  Add: forwardRef((props, ref) =>
    <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) =>
    <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) =>
    <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) =>
    <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) =>
    <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) =>
    <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) =>
    <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) =>
    <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) =>
    <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) =>
    <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) =>
    <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) =>
    <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) =>
    <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) =>
    <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) =>
    <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) =>
    <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) =>
    <ViewColumn {...props} ref={ref} />),
}

export default function WrappedMaterialTable({
  isSelectedRow,
  ...props
}) {
  const selectedAssetId = useSelector(getSelectedAssetId)
  const selectedTaskId = useSelector(getSelectedTaskId)
  const selectedRiskIndex = useSelector(getSelectedRiskIndex)
  const overlayMode = useSelector(getOverlayMode)

  function getRowStyle(rowData) {
    if ((overlayMode === 'tasks') && (selectedTaskId) && (rowData.assetId === selectedAssetId)) {
      return {
        backgroundColor: rowData.id === selectedTaskId  ? 'yellow' : 'white',
      }
    } else if ((overlayMode === 'risks') && (selectedRiskIndex) && (rowData.assetId === selectedAssetId)) {
      return {
        backgroundColor: rowData.vulnerabilityUri === selectedRiskIndex  ? 'yellow' : 'white',
      }
    } else {
      return {
        backgroundColor: rowData.assetId === selectedAssetId  ? 'yellow' : 'white',
      }
    }
  }

  return (
    <MaterialTable
      icons={TABLE_ICONS}
      options={{
        rowStyle: getRowStyle,
        maxBodyHeight: 200,
        pageSize: 10,
        pageSizeOptions: [10],
        padding: 'dense',
        showFirstLastPageButtons: false,
        thirdSortClick: false,
        draggable: false,
      }}
      {...props}
    />
  )
}
