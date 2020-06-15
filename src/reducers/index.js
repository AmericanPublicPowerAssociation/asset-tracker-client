import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import produce from 'immer'
import {
  productNameSuggestions,
  productVersionSuggestions,
  risks,
  selectedRiskIndex,
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
import temporaryAsset from './temporaryAsset'
import selectedAssetId from './selectedAssetId'
import selectedBusId from './selectedBusId'
import taskById from './taskById'
import taskComments from './taskComments'
import taskCodeTypes from './taskCodeTypes'
import hoverInfo from './hoverInfo'
import selectedTaskId from './selectedTaskId'
import message from './message'

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
  temporaryAsset,
  selectedAssetId,
  selectedBusId,
  taskComments,
  vendorNameSuggestions,
  productNameSuggestions,
  productVersionSuggestions,
  sortedRisks,
  risks,
  selectedRiskIndex,
  taskCodeTypes,
  selectedTaskId,
  message,
  sketchMode,  // Keep last
})

const reduceVertically = produce((draft, action) => {
})

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
