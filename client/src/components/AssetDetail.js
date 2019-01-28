import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = {
  assetName: {
    fontSize: 20,
  },
}

class AssetDetail extends Component {
  render() {
    const { classes } = this.props
    const {
      assetById,
      highlightedAssetId,
    } = this.props
    const { updateAsset } = this.props
    const asset = assetById[highlightedAssetId]
    return (
      <form>
        <TextField
          value={(asset && asset.name) || ''}
          fullWidth
          required
          InputProps={{
            classes: { input: classes.assetName },
          }}
          onChange={event => updateAsset(
            Object.assign({}, asset, {
              id: highlightedAssetId,
              name: event.target.value,
            })
          )}
        />
      </form>
    )
  }
}

export default withStyles(styles)(AssetDetail)
