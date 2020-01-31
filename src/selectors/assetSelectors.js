import { createSelector } from 'reselect'
import {
  LINE_ASSET_TYPE_CODE,
} from '../constants'

export const getAssetById = state => state.assetById
export const getFocusingAssetId = state => state.focusingAssetId

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

      if (busId in assetIdByBusId && asset.typeCode === LINE_ASSET_TYPE_CODE) {
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
