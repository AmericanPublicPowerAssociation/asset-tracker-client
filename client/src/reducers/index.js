import { combineReducers } from 'redux'
import assetById from './assetById'
import assetTypeIds from './assetTypeIds'

export default combineReducers({
  assetById,
  assetTypeIds,
})
