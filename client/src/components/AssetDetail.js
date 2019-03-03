import React, { PureComponent } from 'react'
import { ASSET_TYPE_BY_ID } from '../constants'
import AssetName from './AssetName'
import AssetLocation from './AssetLocation'
import AssetRelationChips from './AssetRelationChips'

class AssetDetail extends PureComponent {
  onSubmit = event => event.preventDefault()

  render() {
    const {
      focusingAsset,
      locatingAsset,
      relatingAssetId,
      relatingAssetKey,
      connectedAssets,
      parentAssets,
      childAssets,
      setLocatingAsset,
      setRelatingAsset,
      updateAsset,
    } = this.props
    const focusingAssetTypeId = focusingAsset.get('typeId')
    if (!focusingAssetTypeId) return null
    const focusingAssetType = ASSET_TYPE_BY_ID[focusingAssetTypeId]
    const hasLocation = focusingAssetType['hasLocation'] || false
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
      {hasLocation &&
        <AssetLocation
          focusingAsset={focusingAsset}
          locatingAsset={locatingAsset}
          setLocatingAsset={setLocatingAsset}
        />}
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
