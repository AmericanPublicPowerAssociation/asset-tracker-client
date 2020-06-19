// TODO: Review from scratch
// TODO: Toggle whether to show only what is visible in the map

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import {
  RisksTable,
} from 'asset-report-risks'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import {
  setSelection,
} from '../actions'
import {
  getSelectedAssetId,
  getOverlayMode,
} from '../selectors'

const DRAWER_CLASSES = {
  paper: 'no-overflow-x',
}

export default function TablesWindow({
  isWithTables,
  setIsWithTables,
}) {
  const dispatch = useDispatch()
  const overlayMode = useSelector(getOverlayMode)
  const selectedAssetId = useSelector(getSelectedAssetId)

  function highlightAsset(assetId) {
    dispatch(setSelection({ assetId }))
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
    <Drawer
      anchor='bottom'
      variant='persistent'
      open={isWithTables}
      classes={DRAWER_CLASSES}
    >
      {table}
    </Drawer>
  )
}
