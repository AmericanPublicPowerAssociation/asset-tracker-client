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
        exposedAssetKey={exposedAssetKey}
        asset={asset}
        assetById={assetById}
        onAssetKeyOpen={onAssetKeyOpen}
      />
      <AssetRelationControl
        label='Parents'
        assetKey='parentIds'
        exposedAssetKey={exposedAssetKey}
        asset={asset}
        assetById={assetById}
        onAssetKeyOpen={onAssetKeyOpen}
      />
      <AssetRelationControl
        label='Children'
        assetKey='childIds'
        exposedAssetKey={exposedAssetKey}
        asset={asset}
        assetById={assetById}
        onAssetKeyOpen={onAssetKeyOpen}
      />
    </form>
  )
}

export default withStyles(styles)(AssetDetail)
