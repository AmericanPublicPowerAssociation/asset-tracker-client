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
      highlightedAsset,
      updateAsset,
    } = this.props
    const highlightedAssetId = highlightedAsset.get('id')
    const highlightedAssetName = highlightedAsset.get('name')
    if (!highlightedAssetId) return null
    return (
      <TextField
        value={highlightedAssetName}
        fullWidth
        required
        InputProps={{
          classes: {
            input: classes.name,
          },
        }}
        onChange={event => updateAsset({
          id: highlightedAssetId,
          name: event.target.value,
        })}
      />
    )
  }
}

export default withStyles(styles)(AssetDetailFields)
