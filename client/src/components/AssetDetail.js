import React, { PureComponent } from 'react'
import { ASSET_TYPE_BY_ID } from '../constants'
import AssetName from './AssetName'
import AssetLocationContainer from '../containers/AssetLocationContainer'
import AssetRelationChips from './AssetRelationChips'

class AssetDetail extends PureComponent {
  onSubmit = event => event.preventDefault()

  render() {
    const {
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
    const locatable = focusingAssetType['locatable'] || false
    const assetRelationChipsProps = {
      focusingAsset: focusingAsset,
      relatingAssetId: relatingAssetId,
      relatingAssetKey: relatingAssetKey,
      setRelatingAsset: setRelatingAsset,
    }
    return (
      <form onSubmit={this.onSubmit}>
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
      </form>
    )
  }
}

export default AssetDetail
