import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AssetRelationControl from './AssetRelationControl'

const styles = theme => ({
  assetName: {
    fontSize: 20,
  },
})

const AssetDetail = ({
  classes,
  // Get local variables
  exposedAssetKey,
  onAssetKeyOpen,
  onAssetKeyClose,
  // Get global variables
  assetById,
  highlightedAssetId,
  updateAsset,
}) => {
  const asset = assetById[highlightedAssetId]
  const assetRelationControlProps = {
    exposedAssetKey,
    asset,
    assetById,
    onAssetKeyOpen,
    onAssetKeyClose,
  }
  return (
    <form onSubmit={event => event.preventDefault()}>
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
      <AssetRelationControl
        label='Connections'
        assetKey='connectedIds'
        {...assetRelationControlProps}
      />
      <AssetRelationControl
        label='Parents'
        assetKey='parentIds'
        {...assetRelationControlProps}
      />
      <AssetRelationControl
        label='Children'
        assetKey='childIds'
        {...assetRelationControlProps}
      />
    </form>
  )
}

export default withStyles(styles)(AssetDetail)
