import { createSelector } from 'reselect'

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
