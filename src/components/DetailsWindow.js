// TODO: Rewrite from scratch to clean up logic

import React, { forwardRef, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
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
  IsLayoutMobileContext,
} from '../contexts'
import {
  getOverlayMode,
  getSelectedAsset,
  getTemporaryAsset,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    right: theme.spacing(1),
    width: theme.spacing(32),
    padding: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 108px)',
  },
  withTables: {
    bottom: '50%',
  },
  responsive: {
    position: 'fixed',
    right: 0,
    left: 0,
    bottom: 0,
    padding: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1,
    maxHeight: '30vh',
  },
  fullView: {
    padding: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1,
    height: '100%',
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DetailsWindow({ isWithTables }) {
  const classes = useStyles()
  const overlayMode = useSelector(getOverlayMode)
  const selectedAsset = useSelector(getSelectedAsset)
  const temporaryAsset = useSelector(getTemporaryAsset)
  const [expand, setExpand] = useState(false)
  const isLayoutMobile = useContext(IsLayoutMobileContext)
  const asset = temporaryAsset ? temporaryAsset : selectedAsset

  const DetailsPanel = {
    [OVERLAY_MODE_ASSETS]: AssetAttributesPanel,
    [OVERLAY_MODE_TASKS]: AssetTasksPanel,
    [OVERLAY_MODE_RISKS]: AssetRisksPanel,
  }[overlayMode]

  const detailsPanel = asset ?
    <DetailsPanel
      className={classes.root}
      asset={asset}
      isDetailsWindowExpanded={expand}
      setIsDetailsWindowExpanded={setExpand}
    /> : <EmptyDetailsPanel />

  const MobileFullScreenPanel = (
    <Dialog
      fullScreen
      open={expand}
      onClose={setExpand}
      TransitionComponent={Transition}
    >
      <Paper className={clsx(classes.fullView, {
        [classes.withTables]: isWithTables,
      })}>
        {detailsPanel}
      </Paper>
    </Dialog>
  )

  if (isLayoutMobile && expand) {
    return MobileFullScreenPanel
  }

  return (
    <Paper className={clsx(
      isLayoutMobile ? classes.responsive : classes.root, {
      [classes.withTables]: isWithTables,
    })}>
      {detailsPanel}
    </Paper>
  )
// show expanded only if not mobile and is expanded
// otherwise show regular paper
}
