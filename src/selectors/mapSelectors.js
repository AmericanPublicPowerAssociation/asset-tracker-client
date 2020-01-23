import { createSelector } from 'reselect'
import {
  getAssetById,
} from './assetSelectors'
import {
  BRIGHT_MAP_STYLE_NAMES,
} from '../constants'
import {
  getBusFeatures,
} from '../routines'

export const getMapStyleName = state => state.mapStyleName
export const getMapViewState = state => state.mapViewState
export const getAssetsGeoJson = state => state.assetsGeoJson
export const getSelectedFeatureIndexes = state => state.selectedFeatureIndexes
export const getSketchAssetType = state => state.sketchAssetType

export const getIsMapStyleBright = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return BRIGHT_MAP_STYLE_NAMES.includes(mapStyleName)
})

export const getBusesGeoJson = createSelector([
  getAssetsGeoJson,
  getAssetById,
], (
  assetsGeoJson,
  assetById,
) => {
  const assetFeatures = assetsGeoJson.features
  const busFeatures = getBusFeatures(assetFeatures, assetById)
  return {
    type: 'FeatureCollection',
    features: busFeatures,
  }
})
