import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
// import Downshift from 'downshift'
import { ASSET_TYPE_BY_ID } from '../constants'
import AssetName from './AssetName'
import AssetRelationChips from './AssetRelationChips'
import AssetLocationContainer from '../containers/AssetLocationContainer'

const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
})

class AssetDetail extends PureComponent {
  state = {}

  render() {
    const {
      classes,
      focusingAsset,
      relatingAssetId,
      relatingAssetKey,
      connectedAssets,
      parentAssets,
      childAssets,
      setRelatingAsset,
      updateAsset,
    } = this.props
    const focusingAssetTypeId = focusingAsset.get('typeId')
    if (!focusingAssetTypeId) return null
    const focusingAssetType = ASSET_TYPE_BY_ID[focusingAssetTypeId]
    const focusingAssetId = focusingAsset.get('id');
    const locatable = focusingAssetType['locatable'] || false

    const assetRelationChipsProps = {
      focusingAsset: focusingAsset,
      relatingAssetId: relatingAssetId,
      relatingAssetKey: relatingAssetKey,
      setRelatingAsset: setRelatingAsset,
    }
    return (
      <div>
        <AssetName
          focusingAsset={focusingAsset}
          updateAsset={updateAsset}
        />
        {locatable && <AssetLocationContainer />}
        <AssetRelationChips
          label='Connections'
          assetKey='connectedIds'
          relatedAssets={connectedAssets}
          {...assetRelationChipsProps}
        />
        <AssetRelationChips
          label='Parents'
          assetKey='parentIds'
          relatedAssets={parentAssets}
          {...assetRelationChipsProps}
        />
        <AssetRelationChips
          label='Children'
          assetKey='childIds'
          relatedAssets={childAssets}
          {...assetRelationChipsProps}
        />

        <TextField
          label='Vendor Name'
          value={focusingAsset.get('vendorName', '')}
          fullWidth
          className={classes.attribute}
          onChange={event => updateAsset({
            id: focusingAssetId,
            vendorName: event.target.value,
          })}
          />
        <TextField
          label='Product Name'
          value={focusingAsset.get('productName', '')}
          fullWidth
          className={classes.attribute}
          onChange={event => updateAsset({
            id: focusingAssetId,
            productName: event.target.value,
          })}
          />
        <TextField
          label='Product Version'
          value={focusingAsset.get('productVersion', '')}
          fullWidth
          className={classes.attribute}
          onChange={event => updateAsset({
            id: focusingAssetId,
            productVersion: event.target.value,
          })}
          />
      </div>
    )
  }
}

export default withStyles(styles)(AssetDetail)
