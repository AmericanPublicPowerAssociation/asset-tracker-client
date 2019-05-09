import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    margin: `0 ${theme.spacing.unit * 3}px`,
  },
})

class NotAuthenticatedWindow extends PureComponent {
  render() {
    const {
      classes,
    } = this.props
    return (
      <div className={classes.root}>
        <Typography variant='h6' align='center' paragraph>
          Sign In Required
        </Typography>
        <Typography variant='h7' paragraph>
          Asset Tracker is a service provided by the <a href='https://www.publicpower.org' target='_blank' rel='noopener noreferrer'>American Public Power Association</a> to help utilities extend the lifetime of their assets and provide reliable power to their customers.  
        </Typography>
        <Typography variant='h7' paragraph>
          Please sign in using the link in the navigation bar to the left.
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(NotAuthenticatedWindow)
