import React, { PureComponent } from 'react'
import { List } from 'immutable'
import { ASSET_TYPE_BY_ID } from '../constants'
import AssetName from './AssetName'
import AssetLocation from './AssetLocation'
import AssetRelationChips from './AssetRelationChips'

class AssetDetail extends PureComponent {
  handleSubmit = event => event.preventDefault()

  render() {
    const {
      highlightedAssetId,
      exposedAssetId,
      exposedAssetKey,
      assetById,
      updateAsset,
      setExposedAsset,
    } = this.props
    if (!highlightedAssetId) return null
    const highlightedAsset = assetById.get(highlightedAssetId)
    const highlightedAssetType = ASSET_TYPE_BY_ID[
      highlightedAsset.get('typeId')]
    const hasLocation = highlightedAssetType['hasLocation'] || false
    const getRelatedAssets = assetKey => highlightedAsset.get(
      assetKey, List()).map(assetId => assetById.get(assetId))
    const assetRelationChipsProps = {
      highlightedAsset: highlightedAsset,
      exposedAssetId: exposedAssetId,
      exposedAssetKey: exposedAssetKey,
      setExposedAsset: setExposedAsset,
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <AssetName
          highlightedAsset={highlightedAsset}
          updateAsset={updateAsset}
        />
        {hasLocation && <AssetLocation />}
        <AssetRelationChips
          label='Connections'
          assetKey='connectedIds'
          relatedAssets={getRelatedAssets('connectedIds')}
          {...assetRelationChipsProps}
        />
        <AssetRelationChips
          label='Parents'
          assetKey='parentIds'
          relatedAssets={getRelatedAssets('parentIds')}
          {...assetRelationChipsProps}
        />
        <AssetRelationChips
          label='Children'
          assetKey='childIds'
          relatedAssets={getRelatedAssets('childIds')}
          {...assetRelationChipsProps}
        />
      </form>
    )
  }
}

export default AssetDetail
