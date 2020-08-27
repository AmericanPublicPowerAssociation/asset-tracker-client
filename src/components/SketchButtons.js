import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
// import SaveIcon from '@material-ui/icons/Save'
// import CloseIcon from '@material-ui/icons/Close'
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
  SKETCH_MODE_EDIT,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  IsLayoutMobileContext,
} from '../contexts'
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
  'noDetailsTables': {
    'position': 'absolute',
    'display': 'table',
    'bottom': 0,
    'left': '50%',
    'marginBottom': '30px',
    'transform': 'translateX(-50%)',
    '& > *': {
      'margin': theme.spacing(1),
    },
  },
  'withDetailsTables': {
    'display': 'inline-block',
    'position': 'relative',
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
  'buttonDetails': {
    'fontSize': '1.1rem',
  },
}))

export default function SketchButtons({ isWithDetails, isWithTables }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const overlayMode = useSelector(getOverlayMode)
  const sketchMode = useSelector(getSketchMode)
  const isWithAssetsOverlay = overlayMode === OVERLAY_MODE_ASSETS
  const isViewing = sketchMode === SKETCH_MODE_VIEW
  const isLayoutMobile = useContext(IsLayoutMobileContext)

  function handleChange() {
    if (!isWithAssetsOverlay) {
      dispatch(setOverlayMode(OVERLAY_MODE_ASSETS))
    }
    if (!isViewing) {
      dispatch(saveAssets())
    }
    dispatch(setSketchMode(isViewing ? SKETCH_MODE_EDIT : SKETCH_MODE_VIEW))
  }

  function handleCancel() {
    dispatch(setSketchMode(SKETCH_MODE_VIEW))
    dispatch(refreshAssets())
    dispatch(refreshTasks())
    dispatch(refreshRisks())
  }

  return (
    <div className={
      (isLayoutMobile ?
        ((isWithDetails || isWithTables) ?
          classes.withDetailsTables
        :
          classes.noDetailsTables
        )
      :
        classes.root
      )
    }>
      <Fab
        className={clsx(
          classes.changeButton,
          classes.buttonDetails,
          !isLayoutMobile && 'rise-animation',
          'white',
        )}
        variant='extended'
        // disabled={!isWithAssetsOverlay}
        onClick={handleChange}
      >
        {isViewing ? 'Add/Edit Assets' : 'SAVE'}
      </Fab>
      {!isViewing &&
        <Fab
          className={clsx(
            classes.cancelButton,
            classes.buttonDetails,
            !isLayoutMobile && 'rise-animation',
          )}
          variant='extended'
          onClick={handleCancel}
        >
          CANCEL
        </Fab>
      }
    </div>
  )
}
