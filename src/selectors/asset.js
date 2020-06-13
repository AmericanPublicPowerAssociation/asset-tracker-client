import { createSelector } from 'reselect'
import {
  ASSET_TYPE_CODE_LINE,
} from '../constants'

export const getAssetTypeByCode = state => state.assetTypeByCode
export const getAssetById = state => state.assetById
export const getSelectedAssetId = state => state.selectedAssetId
export const getEditingAsset = state => state.editingAsset

export const getAssetCount = createSelector([
  getAssetById,
], (
  assetById,
) => {
  return Object.keys(assetById).length
})

// TODO: Consider renaming to getBestAssetIdByBusId
export const getAssetIdByBusId = createSelector([
  getAssetById,
  getEditingAsset,
], (
  assetById,
  editingAsset,
) => {
  const assetIdByBusId = {}
  const assets = Object.entries(assetById)
  if (editingAsset.id) assets.push([editingAsset.id, editingAsset])

  for (const [assetId, asset] of assets) {
    if (asset['is_deleted']) {
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

// TODO: Consider renaming to getAllAssetIdsByBusId
export const getAssetIdsByBusId = createSelector([
  getAssetById,
  getEditingAsset,
], (
  assetById,
  editingAsset,
) => {
  const assetIdsByBusId = {}
  const assets = Object.entries(assetById)
  if (editingAsset.id) assets.push([editingAsset.id, editingAsset])

  for (const [assetId, asset] of assets) {
    if (asset['is_deleted']) {
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
