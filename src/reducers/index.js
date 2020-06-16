import { combineReducers } from 'redux'
import mapStyleName from './mapStyleName'
import mapViewState from './mapViewState'
import assetsGeoJson from './assetsGeoJson'
import temporaryAsset from './temporaryAsset'
import popUpState from './popUpState'
import sketchMode from './sketchMode'

const reduce = combineReducers({
  mapStyleName,
  mapViewState,
  assetsGeoJson,
  temporaryAsset,
  popUpState,
  sketchMode,  // Keep last
})

export default reduce
