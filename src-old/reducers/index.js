import {
  productNameSuggestions,
  productVersionSuggestions,
  risks,
  selectedRiskIndex,
  sortedRisks,
  vendorNameSuggestions,
} from 'asset-report-risks'
import mapViewState from './mapViewState'
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
import selectedTaskId from './selectedTaskId'
import message from './message'

const reduceHorizontally = combineReducers({
  mapViewState,
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
})
