import { createSelector } from 'reselect'
import {
  MAXIMUM_ASSET_LIST_LENGTH,
} from '../constants'
import {
  IntegerDefaultDict,
  splitTerms,
} from '../macros'


export const getAssetById = state => state.get('assetById')
export const getAssetNameQuery = state => state.get('assetNameQuery')
export const getSelectedAssetTypeIds = state => state.get('selectedAssetTypeIds')
export const getSortedAssetIds = state => state.get('sortedAssetIds')


export const getMatchingAssets = createSelector([
  getAssetById,
  getAssetNameQuery,
  getSortedAssetIds,
], (
  assetById,
  assetNameQuery,
  sortedAssetIds,
) => {
  const lowercaseQueryTerms = splitTerms(assetNameQuery.toLowerCase())
  return sortedAssetIds
    .map(assetId => assetById.get(assetId))
    .filter(asset => {
      const lowercaseAssetName = asset.get('name').toLowerCase()
      return lowercaseQueryTerms.every(
        term => lowercaseAssetName.includes(term))
    })
})


export const getVisibleAssets = createSelector([
  getMatchingAssets,
  getSelectedAssetTypeIds,
], (
  matchingAssets,
  selectedAssetTypeIds,
) => {
  return matchingAssets
    .filter(asset => selectedAssetTypeIds.includes(asset.get('typeId')))
    .slice(0, MAXIMUM_ASSET_LIST_LENGTH)
})


export const getCountByAssetTypeId = createSelector([
  getMatchingAssets,
], (
  matchingAssets,
) => {
  return matchingAssets.reduce((countByAssetTypeId, asset) => {
    const typeId = asset.get('typeId')
    countByAssetTypeId[typeId] += 1
    return countByAssetTypeId
  }, new IntegerDefaultDict())
})
