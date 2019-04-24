import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import assetById from './assetById'
import assetLocationById from './assetLocationById'
import featureGeometryById from './featureGeometryById'
import featureColorAttribute from './featureColorAttribute'
import featureSizeAttribute from './featureSizeAttribute'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import sortedAssetIds from './sortedAssetIds'
import selectedAssetIds from './selectedAssetIds'
import focusingAssetId from './focusingAssetId'
import relatingAssetId from './relatingAssetId'
import relatingAssetKey from './relatingAssetKey'
import locatingAssetId from './locatingAssetId'

const horizontalReducer = combineReducers({
  assetById,
  assetLocationById,
  featureGeometryById,
  featureColorAttribute,
  featureSizeAttribute,
  selectedAssetTypeIds,
  sortedAssetIds,
  selectedAssetIds,
  focusingAssetId,
  relatingAssetId,
  relatingAssetKey,
  locatingAssetId,
})

const verticalReducer = (state, action) => {
  return state
}

export default reduceReducers(
  horizontalReducer,
  verticalReducer)
