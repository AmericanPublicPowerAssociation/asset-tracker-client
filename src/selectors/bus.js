import { createSelector } from 'reselect'
import {
  getAssetById,
  getAssetsGeoJson,
} from './asset'
import {
  getBusFeatures,
} from '../routines'

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
