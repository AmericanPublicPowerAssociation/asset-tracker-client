import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: '50%',
    top: theme.spacing(1),
    transform: 'translateX(-50%)',
    zIndex: 1,
  },
}))

function SketchButton(props) {
  const classes = useStyles()
  const { isSketching, setIsSketching } = props

  let color
  let icon

  if (isSketching) {
    color = 'primary'
    icon = 'Exit'
  } else {
    color = 'secondary'
    icon = 'Sketch'
  }

  return (
    <Fab
      className={classes.root}
      variant='extended'
      size='large'
      color={color}
      onClick={ () => setIsSketching(!isSketching) }
    >
      {icon}
    </Fab>
  )
}

export default SketchButton
