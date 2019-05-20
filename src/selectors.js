import { createSelector } from 'reselect'
import { Map } from 'immutable'
import {
  MAXIMUM_ASSET_LIST_LENGTH,
} from './constants'
import {
  IntegerDefaultDict,
} from './macros'


export const getAssetById = state => state.get(
  'assetById')
export const getSortedAssetIds = state => state.get(
  'sortedAssetIds')
export const getAssetFiltersByAttribute = state => state.get(
  'assetFiltersByAttribute')
export const getFocusingAssetId = state => state.get(
  'focusingAssetId')
export const getAssetFilter = state => state.get(
  'assetFilter')


export const getAssetNameFilters = createSelector([
  getAssetFiltersByAttribute,
], (
  assetFiltersByAttribute,
) => {
  return assetFiltersByAttribute.get('name')
})


export const getAssetTypeIdFilters = createSelector([
  getAssetFiltersByAttribute,
], (
  assetFiltersByAttribute,
) => {
  return assetFiltersByAttribute.get('typeId')
})


export const getMatchingAssets = createSelector([
  getAssetById,
  getAssetNameFilters,
  getSortedAssetIds,
], (
  assetById,
  assetNameFilters,
  sortedAssetIds,
) => {
  return sortedAssetIds
    .map(assetId => assetById.get(assetId))
    .filter(asset => {
      const lowercaseAssetName = asset.get('name').toLowerCase()
      return assetNameFilters.every(text => lowercaseAssetName.includes(text))
    })
})


export const getVisibleAssets = createSelector([
  getMatchingAssets,
  getAssetTypeIdFilters,
], (
  matchingAssets,
  assetTypeIdFilters,
) => {
  return matchingAssets
    .filter(asset => assetTypeIdFilters.has(asset.get('typeId')))
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


export const getFocusingAsset = createSelector([
  getFocusingAssetId,
  getAssetById,
], (
  focusingAssetId,
  assetById,
) => {
  return assetById.get(focusingAssetId, Map())
})
