import { combineReducers } from 'redux'
import assetById from './assetById'
import selectedAssetId from './selectedAssetId'
import selectedAssetTypeIds from './selectedAssetTypeIds'

export default combineReducers({
  assetById,
  selectedAssetId,
  selectedAssetTypeIds,
})
