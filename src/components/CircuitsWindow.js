import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const styles = {
  fullHeight: {
    height: '100%',
  },
}


class CircuitsWindow extends PureComponent {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.fullHeight}>
        <Typography variant='h6' align='center'>
          Circuits
        </Typography>
      </Paper>
    )
  }
}


export default withStyles(styles)(CircuitsWindow)
