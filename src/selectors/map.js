import { createSelector } from '@reduxjs/toolkit'
import {
  getAssetById,
} from './asset'
import {
  BRIGHT_MAP_STYLE_NAMES,
  MAP_STYLE_BY_NAME,
} from '../constants'
import {
  getBusFeatures,
} from '../routines'

export const getMapStyleName = state => state.mapStyleName
export const getMapViewState = state => state.mapViewState
export const getOverlayMode = state => state.overlayMode
export const getSketchMode = state => state.sketchMode
export const getAssetsGeoJson = state => state.assetsGeoJson
export const getSelectedAssetIndexes = state => state.selectedAssetIndexes
export const getSelectedBusIndexes = state => state.selectedBusIndexes

export const getMapStyle = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return MAP_STYLE_BY_NAME[mapStyleName]
})

export const getIsMapStyleBright = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return BRIGHT_MAP_STYLE_NAMES.includes(mapStyleName)
})

export const getBusesGeoJson = createSelector([
  getAssetById,
  getAssetsGeoJson,
], (
  assetById,
  assetsGeoJson,
) => {
  const assetFeatures = assetsGeoJson.features
  const busFeatures = getBusFeatures(assetFeatures, assetById)
  return {
    type: 'FeatureCollection',
    features: busFeatures,
  }
})
