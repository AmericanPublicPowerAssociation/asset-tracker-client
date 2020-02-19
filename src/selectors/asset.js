import { createSelector } from 'reselect'
import {
  ASSET_TYPE_CODE_LINE,
} from '../constants'

export const getAssetTypeByCode = state => state.assetTypeByCode
export const getAssetById = state => state.assetById
export const getFocusingAssetId = state => state.focusingAssetId
export const getTaskById = state => state.taskById


export const getAssetByIdLength = createSelector([
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
    const assetConnections = asset.connections || []
    for (const connection of assetConnections) {
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

export const getFocusingAsset = createSelector([
  getFocusingAssetId,
  getAssetById,
], (
  focusingAssetId,
  assetById,
) => {
  return assetById[focusingAssetId]
})


export const getTasksForFocusedAsset = createSelector([
  getFocusingAssetId,
  getTaskById
], (
  focusingAssetId,
  taskById,
) => Object.keys(taskById).filter((task) => task.assetId === focusingAssetId))
