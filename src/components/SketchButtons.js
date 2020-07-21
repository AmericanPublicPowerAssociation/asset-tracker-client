import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import SketchIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import {
  refreshRisks,
} from 'asset-report-risks'
import {
  refreshAssets,
  // TODO: Move refreshTasks to asset-report-tasks/client
  refreshTasks,
  saveAssets,
  setOverlayMode,
  setSketchMode,
} from '../actions'
import {
  OVERLAY_MODE_ASSETS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getOverlayMode,
  getSketchMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  'root': {
    'position': 'fixed',
    'top': 0,
    'left': '50%',
    'transform': 'translateX(-50%)',
    '& > *': {
      'margin': theme.spacing(1),
    },
  },
  'changeButton': {
    'transition': '1s',
    'background': theme.palette.secondary.main,
    '&:hover': {
      'background': theme.palette.secondary.main,
    },
  },
  'cancelButton': {
    'background': 'white',
    '&:hover': {
      'background': 'white',
    },
  },
}))

export default function SketchButtons() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const overlayMode = useSelector(getOverlayMode)
  const sketchMode = useSelector(getSketchMode)
  const isWithAssetsOverlay = overlayMode === OVERLAY_MODE_ASSETS
  const isViewing = sketchMode === SKETCH_MODE_VIEW
  const iconColor = isViewing ? 'black' : 'white'

  function handleChange() {
    if (!isWithAssetsOverlay) {
      dispatch(setOverlayMode(OVERLAY_MODE_ASSETS))
    }
    if (!isViewing) {
      dispatch(saveAssets())
    }
    dispatch(setSketchMode(isViewing ? SKETCH_MODE_ADD : SKETCH_MODE_VIEW))
  }

  function handleCancel() {
    dispatch(setSketchMode(SKETCH_MODE_VIEW))
    dispatch(refreshAssets())
    dispatch(refreshTasks())
    dispatch(refreshRisks())
  }

  return (
    <div className={classes.root}>
      <Tooltip title={isViewing ? 'Sketch' : 'Save'}>
        <Fab
          className={clsx(
            classes.changeButton,
            'rise-animation',
            iconColor,
          )}
          size='small'
          // disabled={!isWithAssetsOverlay}
          onClick={handleChange}
        >
          {isViewing ? <SketchIcon /> : <SaveIcon />}
        </Fab>
      </Tooltip>

    {!isViewing &&
      <Tooltip title='Cancel'>
        <Fab
          className={clsx(
            classes.cancelButton,
            'spin-animation',
          )}
          size='small' 
          onClick={handleCancel}
        >
          <CloseIcon style={{ color: 'blue' }}/>
        </Fab>
      </Tooltip>
    }
    </div>
  )
}
