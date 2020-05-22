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
import mapStyleName from './mapStyleName'
import mapViewState from './mapViewState'
import sketchMode from './sketchMode'
import overlayMode from './overlayMode'
import selectedAssetIndexes from './selectedAssetIndexes'
import selectedBusIndexes from './selectedBusIndexes'
import assetTypeByCode from './assetTypeByCode'
import assetsGeoJson from './assetsGeoJson'
import assetById from './assetById'
import editingAsset from './editingAsset'
import focusingAssetId from './focusingAssetId'
import focusingBusId from './focusingBusId'
import taskById from './taskById'
import taskComments from './taskComments'
import taskCodeTypes from './taskCodeTypes'
import hoverInfo from './hoverInfo'

const reduceHorizontally = combineReducers({
  mapStyleName,
  mapViewState,
  hoverInfo,
  overlayMode,
  selectedAssetIndexes,
  selectedBusIndexes,
  assetTypeByCode,
  assetsGeoJson,
  assetById,
  taskById,
  editingAsset,
  focusingAssetId,
  focusingBusId,
  taskComments,
  vendorNameSuggestions,
  productNameSuggestions,
  productVersionSuggestions,
  sortedRisks,
  risks,
  taskCodeTypes,
  sketchMode,  // Keep last
})

const reduceVertically = produce((draft, action) => {
})

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
