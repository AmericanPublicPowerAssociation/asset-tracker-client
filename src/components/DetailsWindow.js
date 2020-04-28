import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import AssetAttributesPanel from './AssetAttributesPanel'
import AssetTasksPanel from './AssetTasksPanel'
import AssetRisksPanel from './AssetRisksPanel'
import EmptyDetailsPanel from './EmptyDetailsPanel'
import {
  OVERLAY_MODE_ASSETS,
  OVERLAY_MODE_RISKS,
  OVERLAY_MODE_TASKS,
} from '../constants'
import {
  getFocusingAsset,
  getOverlayMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    right: theme.spacing(1),
    bottom: theme.spacing(5),
    width: theme.spacing(32),
    padding: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1,
  },
  withTables: {
    bottom: '50%',
  },
}))

export default function DetailsWindow({ isWithDetails, isWithTables }) {
  const classes = useStyles()
  const overlayMode = useSelector(getOverlayMode)
  const focusingAsset = useSelector(getFocusingAsset)
  
  const DetailsPanel = {
    [OVERLAY_MODE_ASSETS]: AssetAttributesPanel,
    [OVERLAY_MODE_TASKS]: AssetTasksPanel,
    [OVERLAY_MODE_RISKS]: AssetRisksPanel,
  }[overlayMode]

  const detailsPanel = focusingAsset ?
    <DetailsPanel asset={focusingAsset} /> :
    <EmptyDetailsPanel />

  return isWithDetails && (
    <Paper className={clsx(classes.root, {
      [classes.withTables]: isWithTables,
    })}>
      {detailsPanel}
    </Paper>
  )
}
