import { combineReducers } from 'redux'
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
import mapViewport from './mapViewport'

export default combineReducers({
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
  mapViewport,
})
