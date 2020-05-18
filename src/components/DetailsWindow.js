// TODO: Rewrite from scratch to clean up logic

import React, { forwardRef, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
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
  getEditingAsset,
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
    display: 'flex',
    flexDirection: 'column',
    // TODO: Use maxHeight with fixed bottom https://stackoverflow.com/a/45990480/192092
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
  const theme = useTheme()
  const classes = useStyles()
  const overlayMode = useSelector(getOverlayMode)
  const focusingAsset = useSelector(getFocusingAsset)
  const editingAsset = useSelector(getEditingAsset)
  const [expand, setExpand] = useState(false)
  // TODO: Use consistent useMediaQuery string
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))
  const asset = editingAsset.id ? editingAsset : focusingAsset

  const DetailsPanel = {
    [OVERLAY_MODE_ASSETS]: AssetAttributesPanel,
    [OVERLAY_MODE_TASKS]: AssetTasksPanel,
    [OVERLAY_MODE_RISKS]: AssetRisksPanel,
  }[overlayMode]

  const detailsPanel = asset ?
    <DetailsPanel
      className={classes.root}
      asset={asset}
      // tasks={focusingTasks}
      response={isNotMobile}
      isDetailsWindowExpanded={expand}
      setIsDetailsWindowExpanded={setExpand}
    /> : <EmptyDetailsPanel />

  // TODO: Clean
  return expand ? (
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
  ) : (isNotMobile || asset ?
    <Paper className={clsx(!isNotMobile ? classes.responsive : classes.root, {
      [classes.withTables]: isWithTables,
    })}>
      {detailsPanel}
    </Paper> : <></>
  )

// show expanded only if not mobile and is expanded
// otherwise show regular paper
}
