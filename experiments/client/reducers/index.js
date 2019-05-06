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
import searchTerm from './searchTerm'
import mapViewport from './mapViewport'

const horizontalReducer = combineReducers({
  assetById,
  assetLocationById,
  featureGeometryById,
  featureColorAttribute,
  featureSizeAttribute,
  selectedAssetTypeIds,
  sortedAssetIds,
  selectedAssetIds,
  searchTerm,
  focusingAssetId,
  relatingAssetId,
  relatingAssetKey,
  locatingAssetId,
  mapViewport,
})

const verticalReducer = (state, action) => {
  // const actionType = action.type
  // const actionPayload = action.payload

  return state
}
