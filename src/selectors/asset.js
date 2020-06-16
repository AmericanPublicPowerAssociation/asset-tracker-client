import { createSelector } from 'reselect'
import {
  ASSET_TYPE_CODE_LINE,
} from '../constants'

export const getAssetTypeByCode = state => state.assetTypeByCode
export const getAssetById = state => state.assetById
export const getAssetsGeoJson = state => state.assetsGeoJson
export const getTemporaryAsset = state => state.temporaryAsset

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
