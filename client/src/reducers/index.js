import { combineReducers } from 'redux'
import assetById from './assetById'
import sortedAssetIds from './sortedAssetIds'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import highlightedAssetId from './highlightedAssetId'
import exposedAssetId from './exposedAssetId'
import exposedAssetKey from './exposedAssetKey'

export default combineReducers({
  assetById,
  sortedAssetIds,
  selectedAssetTypeIds,
  highlightedAssetId,
  exposedAssetId,
  exposedAssetKey,
  // mappedAssetId,
  // mappedAssetLocation,
})
