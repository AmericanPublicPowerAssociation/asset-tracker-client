import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import mapStyleName from './mapStyleName'
import mapViewState from './mapViewState'
import assetsGeoJson from './assetsGeoJson'
import assetById from './assetById'
import focusingAssetId from './focusingAssetId'
import selectedFeatureIndexes from './selectedFeatureIndexes'

const reduceHorizontally = combineReducers({
  mapStyleName,
  mapViewState,
  assetsGeoJson,
  assetById,
  focusingAssetId,
  selectedFeatureIndexes,
})

const reduceVertically = (state, action) => {
  return state
}

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
