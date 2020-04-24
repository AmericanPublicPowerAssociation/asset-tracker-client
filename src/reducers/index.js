import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import produce from 'immer'
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
import taskComments from './taskComments'
import taskCodeTypes from './taskCodeTypes'

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
  taskCodeTypes,
})

const reduceVertically = produce((draft, action) => {
  switch (action.type) {
  }
})

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
