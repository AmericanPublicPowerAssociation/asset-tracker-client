import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CONTENT_PADDING } from '../constants'


const styles = theme => ({
  root: {
    padding: CONTENT_PADDING,
  },
})


class MapsWindow extends PureComponent {

  render() {
    const {
      classes,
    } = this.props
    return (
      <div className={classes.root}>
      </div>
    )
  }

}


export default withStyles(styles)(MapsWindow)
