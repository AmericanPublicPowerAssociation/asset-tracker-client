import { createSelector } from 'reselect'
import {
  ASSET_TYPE_CODE_LINE,
} from '../constants'

export const getAssetTypeByCode = state => state.assetTypeByCode
export const getAssetById = state => state.assetById
export const getFocusingAssetId = state => state.focusingAssetId

export const getAssetCount = createSelector([
  getAssetById,
], (
  assetById,
) => {
  return Object.keys(assetById).length
})

export const getAssetIdByBusId = createSelector([
  getAssetById,
], (
  assetById,
) => {
  const assetIdByBusId = {}

  for (const [assetId, asset] of Object.entries(assetById)) {
    if (asset['is_deleted'] === true) {
      continue
    }
    const assetConnections = asset.connections || {}
    for (const connection of Object.values(assetConnections)) {
      const busId = connection.busId

      if (busId in assetIdByBusId && asset.typeCode === ASSET_TYPE_CODE_LINE) {
        // Have buses belong to point assets if possible
        continue
      }

      assetIdByBusId[busId] = assetId
    }
  }

  return assetIdByBusId
})

export const getAssetIdsByBusId = createSelector([
  getAssetById,
], (
  assetById,
) => {
  const assetIdsByBusId = {}

  for (const [assetId, asset] of Object.entries(assetById)) {
    if (asset['is_deleted'] === true) {
      continue
    }
    const assetConnections = asset.connections || {}
    for (const connection of Object.values(assetConnections)) {
      const busId = connection.busId
      const assetIds = assetIdsByBusId[busId] || []
      assetIdsByBusId[busId] = [...assetIds, assetId]
    }
  }

  return assetIdsByBusId
})

export const getFocusingAsset = createSelector([
  getFocusingAssetId,
  getAssetById,
], (
  focusingAssetId,
  assetById,
) => {
  let asset = assetById[focusingAssetId]
  if (asset) {
    asset = Object.assign({}, asset)
    asset.id = focusingAssetId
  }
  return asset
})
