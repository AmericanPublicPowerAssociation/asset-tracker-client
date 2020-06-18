// TODO: Review from scratch
// TODO: Turn this into a drawer

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
// import Drawer from '@material-ui/core/Drawer'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import {
  RisksTable,
} from 'asset-report-risks'
import {
  panMapToAsset,
  setSelectedAssetId,
  // setSelectedBusId,
  setSelectedAssetIndexes,
  // setSelectedBusIndexes,
} from '../actions'
import {
  getAssetsGeoJson,
  getSelectedAssetId,
  getOverlayMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: theme.spacing(1),
    right: theme.spacing(1),
    height: '50%',
    bottom: theme.spacing(5),
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      right: 0,
      left: 0,
      bottom: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      zIndex: 1,
      maxHeight: '30vh',
    },
  },
}))

export default function TablesWindow(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { features } = useSelector(getAssetsGeoJson)
  const overlayMode = useSelector(getOverlayMode)
  const selectedAssetId = useSelector(getSelectedAssetId)

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
    dispatch(setSelectedAssetId(assetId))
    // dispatch(setSelectedBusId(null))
  }

  const table = {
    assets: (
      <AssetsTable
        highlightAsset={highlightAsset}
        selectedAssetId={selectedAssetId}
      />
    ),
    tasks: (
      <TasksTable
        highlightAsset={highlightAsset}
        selectedAssetId={selectedAssetId}
      />
    ),
    risks: (
      <RisksTable
        onRowClick={highlightAsset}
        selectedAssetId={selectedAssetId}
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
