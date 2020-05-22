import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import {
  RisksTable,
} from 'asset-report-risks'
import {
  setFocusingAssetId,
  setFocusingBusId,
  setSelectedAssetIndexes,
  setSelectedBusIndexes,
  setPanMapToAsset,
} from '../actions'
import {
  getAssetsGeoJson,
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

  function getHeaderLabel(header) {
    const result = header.replace(/([A-Z])/g, ' $1')
    var headerLabel = result.charAt(0).toUpperCase() + result.slice(1)
    return headerLabel
  }

  function highlightAsset(assetId) {
    const selectedIndex = features.findIndex( feature => (
      feature.properties.id === assetId
    ))
    dispatch(setFocusingAssetId(assetId))
    dispatch(setFocusingBusId(null))
    dispatch(setSelectedAssetIndexes([selectedIndex]))
    dispatch(setSelectedBusIndexes([]))
    if (selectedIndex > -1)
      panToAsset(features[selectedIndex])
  }

  function panToAsset(assetGeoJson) {
    dispatch(setPanMapToAsset(assetGeoJson))
  }

  const pageSizeOptions = [5, 10]

  const table = {
    assets: (
      <AssetsTable
        getHeaderLabel={getHeaderLabel}
        highlightAsset={highlightAsset}
        pageSizeOptions={pageSizeOptions}
      />
    ),
    tasks: (
      <TasksTable
        getHeaderLabel={getHeaderLabel}
        highlightAsset={highlightAsset}
        pageSizeOptions={pageSizeOptions}
      />
    ),
    risks: (
      <RisksTable
        onRowClick={highlightAsset}
        pageSizeOptions={pageSizeOptions}
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
