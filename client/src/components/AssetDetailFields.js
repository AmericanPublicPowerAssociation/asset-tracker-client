import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = {
  name: {
    fontSize: 20,
  },
}

const AssetDetailFields = ({
  classes,
  highlightedAssetId,
  assetById,
  updateAsset,
}) => {
  const asset = assetById[highlightedAssetId]
  return (
    <TextField
      value={(asset && asset.name) || ''}
      fullWidth
      required
      InputProps={{
        classes: {
          input: classes.name,
        },
      }}
      onChange={event => updateAsset(
        Object.assign({}, asset, {
          id: highlightedAssetId,
          name: event.target.value})
      )}
    />
  )
}

export default withStyles(styles)(AssetDetailFields)
