import { combineReducers } from 'redux'
import assetById from './assetById'
import assetLocationById from './assetLocationById'
import featureColorAttribute from './featureColorAttribute'
import featureSizeAttribute from './featureSizeAttribute'
import sortedAssetIds from './sortedAssetIds'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import focusingAssetId from './focusingAssetId'
import relatingAssetId from './relatingAssetId'
import relatingAssetKey from './relatingAssetKey'
import locatingAssetId from './locatingAssetId'

export default combineReducers({
  assetById,
  assetLocationById,
  featureColorAttribute,
  featureSizeAttribute,
  sortedAssetIds,
  selectedAssetTypeIds,
  focusingAssetId,
  relatingAssetId,
  relatingAssetKey,
  locatingAssetId,
})
