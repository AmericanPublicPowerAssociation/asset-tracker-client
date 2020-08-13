import { createSelector } from 'reselect'
import {
  ASSET_TYPE_CODE_LINE,
} from '../constants'

export const getAssetTypeByCode = state => state.assetTypeByCode
export const getAssetById = state => state.assetById
export const getAssetsGeoJson = state => state.assetsGeoJson
export const getTemporaryAsset = state => state.temporaryAsset
export const getSelectedAssetId = state => state.selectedAssetId

export const getVisibleAssetCount = createSelector([
  getAssetById,
], (
  assetById,
) => {
  // TODO: Count only assets that are visible in map
  return Object.keys(assetById).length
})

const getTemporaryAssetById = createSelector([
  getAssetById,
  getTemporaryAsset,
], (
  assetById,
  temporaryAsset,
) => {
  const temporaryAssetById = temporaryAsset ? {
    [temporaryAsset.id]: temporaryAsset,
  } : {}
  return Object.assign({}, temporaryAssetById, assetById)
})

export const getBestAssetIdByBusId = createSelector([
  getTemporaryAssetById,
], (
  temporaryAssetById,
) => {
  const assetIdByBusId = {}
  for (const [assetId, asset] of Object.entries(temporaryAssetById)) {
    if (asset['isDeleted']) continue

    const assetTypeCode = asset.typeCode
    for (const connection of Object.values(asset.connections || {})) {
      const { busId } = connection
      if (assetTypeCode === ASSET_TYPE_CODE_LINE && busId in assetIdByBusId) {
        // Assign buses to point assets when possible
        continue
      }
      assetIdByBusId[busId] = assetId
    }
  }
  return assetIdByBusId
})

export const getAssetIdsByBusId = createSelector([
  getTemporaryAssetById,
], (
  temporaryAssetById,
) => {
  const assetIdsByBusId = {}
  for (const [assetId, asset] of Object.entries(temporaryAssetById)) {
    if (asset['isDeleted']) continue

    for (const connection of Object.values(asset.connections || {})) {
      const { busId } = connection
      const assetIds = assetIdsByBusId[busId] || []
      assetIdsByBusId[busId] = [...assetIds, assetId]
    }
  }
  return assetIdsByBusId
})

export const getSelectedAsset = createSelector([
  getSelectedAssetId,
  getAssetById,
], (
  selectedAssetId,
  assetById,
) => {
  let asset = assetById[selectedAssetId]
  if (asset) {
    asset = Object.assign({}, asset)
    asset.id = selectedAssetId
  }
  return asset
})

export const getAssetsIconLayer = createSelector([
  getAssetsGeoJson,
  getSelectedAssetId,
], (
  assetsGeoJson,
  selectedAssetId,
) => {
  return assetsGeoJson.features
    .filter(obj => obj.properties.typeCode !== ASSET_TYPE_CODE_LINE)
    .filter(obj => obj.properties.id !== selectedAssetId)
})
