import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import StartSketchingIcon from '@material-ui/icons/Edit'
import StopSketchingIcon from '@material-ui/icons/Check'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: '50%',
    bottom: theme.spacing(1),
    transform: 'translateX(-50%)',
  },
}))

function SketchButton(props) {
  const classes = useStyles()
  const { isSketching, setIsSketching } = props

  let color
  let icon

  if (isSketching) {
    color = 'primary'
    icon = <StopSketchingIcon />
  } else {
    color = 'secondary'
    icon = <StartSketchingIcon />
  }

  return (
    <Fab
      className={classes.root}
      variant='round'
      size='large'
      color={color}
      onClick={ () => setIsSketching(!isSketching) }
    >
      {icon}
    </Fab>
  )
}

export default SketchButton
