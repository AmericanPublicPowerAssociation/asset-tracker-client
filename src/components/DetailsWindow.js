import React, {useState} from 'react'
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
  getTasksForFocusedAsset,
} from '../selectors'
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

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
  return <Slide direction="up" ref={ref} {...props} />
})


export default function DetailsWindow(props) {
  const classes = useStyles()
  const theme = useTheme()
  const {
    isWithDetails,
    isWithTables,
    overlayMode,
    sketchMode,
    setSelectedBusIndexes,
    setSelectedAssetIndexes,
  } = props
  const [expand, setExpand] = useState(false)
  const focusingAsset = useSelector(getFocusingAsset)
  const tasksForFocusingAsset = useSelector(getTasksForFocusedAsset)
  
  const DetailsPanel = {
    [OVERLAY_MODE_ASSETS]: AssetAttributesPanel,
    [OVERLAY_MODE_TASKS]: AssetTasksPanel,
    [OVERLAY_MODE_RISKS]: AssetRisksPanel,
  }[overlayMode]

  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));

  const detailsPanel = focusingAsset ?
    <DetailsPanel
      asset={focusingAsset}
      tasks={tasksForFocusingAsset}
      sketchMode={sketchMode}
      overlayMode={overlayMode} 
      setSelectedBusIndexes={setSelectedBusIndexes}
      setSelectedAssetIndexes={setSelectedAssetIndexes}
      response={isNotMobile}
      isDetailsWindowExpanded={expand}
      setIsDetailsWindowExpanded={setExpand}
    /> : <EmptyDetailsPanel />

  return expand ? (<Dialog fullScreen open={expand} onClose={setExpand} TransitionComponent={Transition} classes={{paper: classes.background}}>

    <Paper className={clsx( classes.fullView, {
      poof: !isWithDetails,
      [classes.withTables]: isWithTables,
    })}>
      {detailsPanel}
    </Paper>
  </Dialog>) : (
    isNotMobile || focusingAsset ?
    <Paper className={clsx( !isNotMobile ? classes.responsive : classes.root, {
      poof: !isWithDetails,
      [classes.withTables]: isWithTables,
    })}>
      {detailsPanel}
    </Paper>
      : <></>
  )
}
