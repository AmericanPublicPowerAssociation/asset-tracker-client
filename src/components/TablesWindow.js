import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import {
  RisksTable,
} from 'asset-report-risks'
import {
  panMapToAsset,
  setFocusingAssetId,
  // setFocusingBusId,
  setSelectedAssetIndexes,
  // setSelectedBusIndexes,
} from '../actions'
import {
  getAssetsGeoJson,
  getFocusingAssetId,
  getOverlayMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: theme.spacing(1),
    right: theme.spacing(1),
    height: '33%',
    bottom: theme.spacing(5),
    overflow: 'auto',
  },
}))

export default function TablesWindow(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { features } = useSelector(getAssetsGeoJson)
  const overlayMode = useSelector(getOverlayMode)
  const focusingAssetId = useSelector(getFocusingAssetId)

  function getHeaderLabel(header) {
    const result = header.replace(/([A-Z])/g, ' $1')
    var headerLabel = result.charAt(0).toUpperCase() + result.slice(1)
    return headerLabel
  }

  function highlightAsset(assetId) {
    const selectedAssetIndexes = []
    const selectedAssetIndex = features.findIndex(
      feature => feature.properties.id === assetId)
    if (selectedAssetIndex > -1) {
      selectedAssetIndexes.push(selectedAssetIndex)
      // TODO: Rename
      // TODO: Combine below into a single dispatch
      dispatch(panMapToAsset(features[selectedAssetIndex]))
    }
    dispatch(setSelectedAssetIndexes(selectedAssetIndexes))
    // dispatch(setSelectedBusIndexes([]))
    dispatch(setFocusingAssetId(assetId))
    // dispatch(setFocusingBusId(null))
  }

  const pageSizeOptions = [5, 10]
  const tableOptions =  {
    search: true,
    pageSizeOptions,
  }

  const table = {
    assets: (
      <AssetsTable
        getHeaderLabel={getHeaderLabel}
        highlightAsset={highlightAsset}
        focusingAssetId={focusingAssetId}
        tableOptions={tableOptions}
      />
    ),
    tasks: (
      <TasksTable
        getHeaderLabel={getHeaderLabel}
        highlightAsset={highlightAsset}
        focusingAssetId={focusingAssetId}
        tableOptions={tableOptions}
      />
    ),
    risks: (
      <RisksTable
        onRowClick={highlightAsset}
        focusingAssetId={focusingAssetId}
        tableOptions={tableOptions}
      />
    ),
  }[overlayMode]

  return (
    <div className={classes.root}>
      {/* TODO: Show only what is visible in the map */}
      {/* TODO: Implement paging */}
      { table }
    </div>
  )
}
