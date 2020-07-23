import { combineReducers } from 'redux'
import {
  productNameSuggestions,
  productVersionSuggestions,
  risks,
  selectedRiskIndex,
  vendorNameSuggestions,
} from 'asset-report-risks'
import mapStyleName from './mapStyleName'
import mapViewState from './mapViewState'
import assetsGeoJson from './assetsGeoJson'
import temporaryAsset from './temporaryAsset'
import popUpState from './popUpState'
import popUpDeleteMidpointState from './popUpDeleteMidpointState'
import sketchMode from './sketchMode'
import overlayMode from './overlayMode'
import selectedAssetIndexes from './selectedAssetIndexes'
import selectedBusIndexes from './selectedBusIndexes'
import assetTypeByCode from './assetTypeByCode'
import assetById from './assetById'
import selectedAssetId from './selectedAssetId'
import selectedBusId from './selectedBusId'
import taskById from './taskById'
import taskComments from './taskComments'
import taskCodeTypes from './taskCodeTypes'
import selectedTaskId from './selectedTaskId'
import message from './message'

// TODO: Review order
const reduce = combineReducers({
  mapStyleName,
  mapViewState,
  assetsGeoJson,
  temporaryAsset,
  popUpState,
  popUpDeleteMidpointState,
  overlayMode,
  selectedAssetIndexes,
  selectedBusIndexes,
  assetTypeByCode,
  assetById,
  taskById,
  selectedAssetId,
  selectedBusId,
  taskComments,
  vendorNameSuggestions,
  productNameSuggestions,
  productVersionSuggestions,
  risks,
  selectedRiskIndex,
  taskCodeTypes,
  selectedTaskId,
  message,
  sketchMode,  // Keep last
})

export default reduce
