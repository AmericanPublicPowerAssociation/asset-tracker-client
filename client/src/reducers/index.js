import { combineReducers } from 'redux'
import assetById from './assetById'
import highlightedAssetId from './highlightedAssetId'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import sortedAssetIds from './sortedAssetIds'

export default combineReducers({
  assetById,
  highlightedAssetId,
  selectedAssetTypeIds,
  sortedAssetIds,
})
