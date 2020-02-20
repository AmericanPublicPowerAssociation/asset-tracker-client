import React from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import SketchIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import {
  refreshRisks,
} from 'asset-report-risks'
import {
  refreshAssets,
} from '../actions'
import {
  OVERLAY_MODE_ASSETS,
  SKETCH_MODE_VIEW,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(0.5),
    left: '50%',
    transform: 'translateX(-50%)',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export default function SketchButtons(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    overlayMode,
    sketchMode,
    changeSketchMode,
    saveAssets,
  } = props
  const isViewing = sketchMode === SKETCH_MODE_VIEW
  const iconColor = isViewing ? 'black' : 'white'

  function handleClick() {
    if (!isViewing) {
      saveAssets()
    }
    changeSketchMode(isViewing ? 'sketch' : SKETCH_MODE_VIEW)
  }

  function handleClickOnCancel() {
    changeSketchMode(SKETCH_MODE_VIEW)
    dispatch(refreshAssets())
    dispatch(refreshRisks())
  }

  return (
    <div className={clsx(classes.root, {
      poof: overlayMode !== OVERLAY_MODE_ASSETS,
    })}>
      <Fab
        className={clsx(iconColor)}
        size='small'
        color='secondary'
        onClick={handleClick}
      >
        {isViewing ? <SketchIcon /> : <SaveIcon />}
      </Fab>
      <Fab
        className={clsx(iconColor, {
          poof: isViewing,
        })}
        size='small' 
        color='primary'
        onClick={handleClickOnCancel}
      >
        <CloseIcon />
      </Fab>
    </div>
  )
}
