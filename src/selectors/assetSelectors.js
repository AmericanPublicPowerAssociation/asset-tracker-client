import { createSelector } from 'reselect'
import { ASSET_TABLE_COLUMN_NAMES } from '../constants'

export const getAssetById = state => state.assetById
export const getFocusingAssetId = state => state.focusingAssetId

export const getFocusingAsset = createSelector([
  getFocusingAssetId,
  getAssetById,
], (
  focusingAssetId,
  assetById,
) => {
  return assetById[focusingAssetId]
})


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
}
)
