import { combineReducers } from 'redux'
import assetById from './assetById'
import highlightedAssetId from './highlightedAssetId'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import visibleAssetIds from './visibleAssetIds'

export default combineReducers({
  assetById,
  highlightedAssetId,
  selectedAssetTypeIds,
  visibleAssetIds,
})
