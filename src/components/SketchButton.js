import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import SketchIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
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
  },
}))

export default function SketchButton(props) {
  const classes = useStyles()
  const {
    overlayMode,
    sketchMode,
    setSketchMode,
    saveAssets,
  } = props
  const isViewing = sketchMode === SKETCH_MODE_VIEW
  const iconColor = isViewing ? 'black' : 'white'

  function handleClick() {
    if (!isViewing) {
      saveAssets()
    }
    setSketchMode(isViewing ? 'sketch' : SKETCH_MODE_VIEW)
  }

  return (
    <Fab
      className={clsx(classes.root, {
        poof: overlayMode !== OVERLAY_MODE_ASSETS,
      }, iconColor)}
      size='small'
      color='secondary'
      onClick={handleClick}
    >
      {isViewing ? <SketchIcon /> : <SaveIcon />}
    </Fab>
  )
}
