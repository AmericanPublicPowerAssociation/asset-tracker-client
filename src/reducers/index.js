import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import mapStyleName from './mapStyleName'
import mapViewState from './mapViewState'
import assetsGeoJson from './assetsGeoJson'
import assetById from './assetById'
import focusingAssetId from './focusingAssetId'
import selectedFeatureIndexes from './selectedFeatureIndexes'
import sketchAssetType from './sketchAssetType'
import rowsWindow from './rowsWindow'

const reduceHorizontally = combineReducers({
  mapStyleName,
  mapViewState,
  assetsGeoJson,
  assetById,
  focusingAssetId,
  selectedFeatureIndexes,
  sketchAssetType,
  rowsWindow,
})

const reduceVertically = (state, action) => {
  return state
}

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
