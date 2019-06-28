import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { CONTENT_PADDING } from '../constants'


const styles = {
  root: {
    padding: CONTENT_PADDING,
    height: '100%',
    overflow: 'auto',
  },
}


class NotAuthorizedWindow extends PureComponent {
  render() {
    const { classes } = this.props
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
}


export default withStyles(styles)(NotAuthorizedWindow)
