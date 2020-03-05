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
import focusingAssetId from './focusingAssetId'
import focusingBusId from './focusingBusId'
import taskById from './taskById'
import taskComments from "./taskComments";

const reduceHorizontally = combineReducers({
  mapStyleName,
  mapViewState,
  assetTypeByCode,
  assetsGeoJson,
  assetById,
  taskById,
  focusingAssetId,
  focusingBusId,
  taskComments,
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
