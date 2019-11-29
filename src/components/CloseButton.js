import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    cursor: 'pointer',
  },
}))

function CloseButton(props) {
  const classes = useStyles()
  return (
    <CloseIcon
      className={classes.root}
      {...props}
    />
  )
}

export default CloseButton
