import { createSelector } from 'reselect'
import {
  // ASSET_TABLE_COLUMN_NAMES,
  ASSET_TYPE_CODE_LINE,
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

/*
export const getAssetTableData = createSelector([
  getAssetById,
],
  (
  assetById
) => {
  const data = []
  Object.keys(assetById).forEach(function(key, idx) {
    data.push(assetById[key])
  })
  return {
    data,
    head: ASSET_TABLE_COLUMN_NAMES,
    name: 'asset',
  }
})
*/
