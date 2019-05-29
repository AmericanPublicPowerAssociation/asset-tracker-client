import React, { PureComponent, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'


const styles = theme => ({
})


class AssetLocation extends PureComponent {

  state = {
    showCoordinates: false,
  }

  render() {
    const {
      classes,
      className,
    } = this.props
    return(
      <FormControl fullWidth className={className}>
      </FormControl>
    )
  }

}


export default withStyles(styles)(AssetLocation)
