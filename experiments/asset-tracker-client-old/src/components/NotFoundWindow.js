import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const styles = {
  fullHeight: {
    height: '100%',
  },
}


class NotFoundWindow extends PureComponent {

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.fullHeight}>
        <Typography variant='h6' align='center' paragraph>
          Whoops!
        </Typography>
        <Typography align='center' paragraph>
          We could not find the page you requested.
        </Typography>
      </Paper>
    )
  }

}


export default withStyles(styles)(NotFoundWindow)
