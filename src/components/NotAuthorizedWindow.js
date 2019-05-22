import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { CONTENT_PADDING } from '../constants'


const styles = theme => ({
  root: {
    padding: CONTENT_PADDING,
  },
})


class NotAuthorizedWindow extends PureComponent {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>

        <Typography variant='h6' align='center' paragraph>
          Not Authorized
        </Typography>
        <Typography align='center' paragraph>
          You are not authorized to access this resource.
        </Typography>

      </div>
    )
  }
}


export default withStyles(styles)(NotAuthorizedWindow)
