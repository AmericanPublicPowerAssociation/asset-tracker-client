import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import SketchIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'

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
    sketchMode,
    setSketchMode,
  } = props
  const isViewing = sketchMode === 'view'
  const iconColor = isViewing ? 'black' : 'white'

  function handleClick() {
    // if (!isViewing) {
    // }
    setSketchMode(isViewing ? 'sketch' : 'view')
  }

  return (
    <Fab
      className={clsx(classes.root, iconColor)}
      size='small'
      color='secondary'
      onClick={handleClick}
    >
      {isViewing ? <SketchIcon /> : <SaveIcon />}
    </Fab>
  )
}
