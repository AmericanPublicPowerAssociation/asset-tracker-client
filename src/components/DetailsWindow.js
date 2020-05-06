import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
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
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

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
    maxHeight: '80%',
  },
  fullView: {
    padding: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1,
    height: '100%',
    maxHeight: '100%',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DetailsWindow({ isWithTables }) {
  const theme = useTheme()
  const classes = useStyles()
  const overlayMode = useSelector(getOverlayMode)
  const focusingAsset = useSelector(getFocusingAsset)
  const [expand, setExpand] = useState(false)
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const DetailsPanel = {
    [OVERLAY_MODE_ASSETS]: AssetAttributesPanel,
    [OVERLAY_MODE_TASKS]: AssetTasksPanel,
    [OVERLAY_MODE_RISKS]: AssetRisksPanel,
  }[overlayMode]

  const detailsPanel = focusingAsset ?
    <DetailsPanel
      className={classes.root}
      asset={focusingAsset}
      // tasks={focusingTasks}
      response={isNotMobile}
      isDetailsWindowExpanded={expand}
      setIsDetailsWindowExpanded={setExpand}
    /> : <EmptyDetailsPanel />

  // TODO: Clean
  return expand ? (
    <Dialog fullScreen open={expand} onClose={setExpand} TransitionComponent={Transition} classes={{ paper: classes.background }}>
      <Paper className={clsx( classes.fullView, {
        [classes.withTables]: isWithTables,
      })}>
        {detailsPanel}
      </Paper>
    </Dialog>
  ) : (isNotMobile || focusingAsset ?
    <Paper className={clsx( !isNotMobile ? classes.responsive : classes.root, {
      [classes.withTables]: isWithTables,
    })}>
      {detailsPanel}
    </Paper> : <></>
  )
}
