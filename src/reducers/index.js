import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import produce from 'immer'
import {
  productNameSuggestions,
  productVersionSuggestions,
  risks,
  sortedRisks,
  vendorNameSuggestions,
} from 'asset-report-risks'
import {
  SET_SKETCH_MODE,
} from '../constants'

import mapStyleName from './mapStyleName'
import mapViewState from './mapViewState'
import sketchMode from './sketchMode'
import overlayMode from './overlayMode'
import selectedAssetIndexes from './selectedAssetIndexes'
import selectedBusIndexes from './selectedBusIndexes'
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
  sketchMode,
  overlayMode,
  selectedAssetIndexes,
  selectedBusIndexes,
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
    case SET_SKETCH_MODE: {
      const sketchMode = action.payload
      draft.selectedAssetIndexes = []
      draft.sketchMode = sketchMode
      break
    }
    default: { }
  }
})

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
