import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    height: '100%',
    overflow: 'auto',
  },
}))


export default function NotAuthorizedWindow(props) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Typography variant='h6' align='center' paragraph>
        Not Authorized
      </Typography>
      <Typography align='center' paragraph>
        You are not authorized to access this resource.
      </Typography>
    </Paper>
  )
}
