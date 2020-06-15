import { createSelector } from 'reselect'
import {
  ASSET_TYPE_CODE_LINE,
} from '../constants'

export const getAssetTypeByCode = state => state.assetTypeByCode
export const getAssetById = state => state.assetById
export const getSelectedAssetId = state => state.selectedAssetId
export const getTemporaryAsset = state => state.temporaryAsset

export const getAssetCount = createSelector([
  getAssetById,
], (
  assetById,
) => {
  return Object.keys(assetById).length
})

const getTemporaryAssetById = createSelector([
  getAssetById,
  getTemporaryAsset,
], (
  assetById,
  temporaryAsset,
) => {
  const temporaryAssetId = temporaryAsset.id
  const temporaryAssetById = temporaryAssetId ?
    { temporaryAssetId: temporaryAsset } : {}
  return Object.assign({}, temporaryAssetById, assetById)
})

export const getBestAssetIdByBusId = createSelector([
  getTemporaryAssetById,
], (
  temporaryAssetById,
) => {
  const assetIdByBusId = {}
  for (const [assetId, asset] of Object.entries(temporaryAssetById)) {
    if (asset['isDeleted']) {
      continue
    }
    for (const connection of Object.values(asset.connections || {})) {
      const { busId } = connection
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
  getTemporaryAssetById,
], (
  temporaryAssetById,
) => {
  const assetIdsByBusId = {}
  for (const [assetId, asset] of Object.entries(temporaryAssetById)) {
    if (asset['isDeleted']) {
      continue
    }
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
