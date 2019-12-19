import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
}))

export default function OptionsWindow(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      Whee
    </div>
  )
}
