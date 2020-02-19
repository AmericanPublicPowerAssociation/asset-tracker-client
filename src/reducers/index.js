import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import {
  sortedRisks,
  risks,
  productNameSuggestions,
  productVersionSuggestions,
  vendorNameSuggestions,
} from 'asset-report-risks'

import mapStyleName from './mapStyleName'
import mapViewState from './mapViewState'
import assetTypeByCode from './assetTypeByCode'
import assetsGeoJson from './assetsGeoJson'
import assetById from './assetById'
import deletedAssetIds from './deletedAssetIds'
import focusingAssetId from './focusingAssetId'
import focusingBusId from './focusingBusId'

const reduceHorizontally = combineReducers({
  mapStyleName,
  mapViewState,
  assetTypeByCode,
  assetsGeoJson,
  assetById,
  deletedAssetIds,
  focusingAssetId,
  focusingBusId,
  vendorNameSuggestions,
  productNameSuggestions,
  productVersionSuggestions,
  sortedRisks,
  risks,
})

const reduceVertically = (state, action) => {
  return state
}

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
