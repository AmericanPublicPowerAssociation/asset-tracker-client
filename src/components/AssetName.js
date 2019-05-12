import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'


class AssetName extends PureComponent {
  render() {
    const {
      ...etc
    } = this.props
    return (
      <TextField
        fullWidth
        label='Asset Name'
        {...etc}
      />
    )
  }
}


export default AssetName
