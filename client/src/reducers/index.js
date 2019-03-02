import { combineReducers } from 'redux'
import assetById from './assetById'
import sortedAssetIds from './sortedAssetIds'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import focusingAssetId from './focusingAssetId'
import relatingAssetId from './relatingAssetId'
import relatingAssetKey from './relatingAssetKey'
import locatingAssetId from './locatingAssetId'

export default combineReducers({
  assetById,
  sortedAssetIds,
  selectedAssetTypeIds,
  focusingAssetId,
  relatingAssetId,
  relatingAssetKey,
  locatingAssetId,
})
