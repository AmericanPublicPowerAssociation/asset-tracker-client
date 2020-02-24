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
import selectedBusIndexes from './selectedBusIndexes'

const reduceHorizontally = combineReducers({
  mapStyleName,
  mapViewState,
  assetTypeByCode,
  assetsGeoJson,
  assetById,
  focusingAssetId,
  focusingBusId,
  vendorNameSuggestions,
  productNameSuggestions,
  productVersionSuggestions,
  sortedRisks,
  risks,
  selectedBusIndexes,
})

const reduceVertically = (state, action) => {
  return state
}

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
