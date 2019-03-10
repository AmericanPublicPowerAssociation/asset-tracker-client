import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = {
  name: {
    fontSize: 20,
  },
}

class AssetDetailFields extends PureComponent {
  render() {
    const {
      classes,
      focusingAsset,
      updateAsset,
    } = this.props
    const focusingAssetId = focusingAsset.get('id')
    const focusingAssetName = focusingAsset.get('name')
    if (!focusingAssetId) return null
    return (
      <TextField
        value={focusingAssetName}
        fullWidth
        required
        InputProps={{
          classes: {
            input: classes.name,
          },
        }}
        onChange={event => updateAsset({
          id: focusingAssetId,
          name: event.target.value,
        })}
      />
    )
  }
}

export default withStyles(styles)(AssetDetailFields)
