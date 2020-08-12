import { createSelector } from 'reselect'
import {
  getAssetById,
  getAssetsGeoJson,
  getSelectedAssetId,
} from './asset'
import {
  getIsViewing,
  getMapViewState,
} from './map'
import {
  getBusFeatures,
} from '../routines'

export const getSelectedBusId = state => state.selectedBusId

export const getBusesGeoJson = createSelector([
  getAssetById,
  getAssetsGeoJson,
  getIsViewing,
  getMapViewState,
  getSelectedAssetId,
], (
  assetById,
  assetsGeoJson,
  isViewing,
  mapViewState,
  selectedAssetId,
) => {
  const { zoom } = mapViewState
  const hideAssets = isViewing && (zoom < 16)
  let assetFeatures
  if ( hideAssets && !selectedAssetId) {
      return { type: 'FeatureCollection', features: [] }
  }
  else if (hideAssets && selectedAssetId) {
    assetFeatures = [assetsGeoJson.features.find(feature => feature.properties.id === selectedAssetId)]
  }
  else {
    assetFeatures = assetsGeoJson.features
  }
  const busFeatures = getBusFeatures(assetFeatures, assetById)
  return { type: 'FeatureCollection', features: busFeatures }
})
