import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}))


export default function CircuitsWindow(props) {
  const classes = useStyles()

  return (
    <Typography
      className={classes.root}
      variant='h2'
    >
      Coming Soon!
    </Typography>
  )
}
