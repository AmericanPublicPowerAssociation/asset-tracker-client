import { createSelector } from 'reselect'
import { Map } from 'immutable'
import {
  MAXIMUM_ASSET_LIST_LENGTH,
} from './constants'
import {
  IntegerDefaultDict,
  splitTerms,
} from './macros'


export const getAssetById = state => state.get(
  'assetById')
export const getSortedAssetIds = state => state.get(
  'sortedAssetIds')
export const getAssetFilterKeysByAttribute = state => state.get(
  'assetFilterKeysByAttribute')
export const getAssetFilterValueByAttribute = state => state.get(
  'assetFilterValueByAttribute')
export const getFocusingAssetId = state => state.get(
  'focusingAssetId')
export const getAddingAsset = state => state.get(
  'addingAsset')
export const getApp = state => state.get(
  'app')


export const getMatchingAssets = createSelector([
  getAssetById,
  getAssetFilterValueByAttribute,
  getSortedAssetIds,
], (
  assetById,
  assetFilterValueByAttribute,
  sortedAssetIds,
) => {
  const assetNameTerms = splitTerms(assetFilterValueByAttribute.get(
    'name').toLowerCase())
  return sortedAssetIds
    .map(assetId => assetById.get(assetId))
    .filter(asset => {
      const lowercaseAssetName = asset.get('name').toLowerCase()
      return assetNameTerms.every(term => lowercaseAssetName.includes(term))
    })
})


export const getVisibleAssets = createSelector([
  getMatchingAssets,
  getAssetFilterKeysByAttribute,
], (
  matchingAssets,
  assetFilterKeysByAttribute,
) => {
  const selectedAssetTypeIds = assetFilterKeysByAttribute.get('typeId')
  return matchingAssets
    .filter(asset => selectedAssetTypeIds.has(asset.get('typeId')))
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


export const getIsUserAuthenticated = createSelector([
  getApp], app => app.get('isUserAuthenticated'))
export const getIsUserMember = createSelector([
  getApp], app => app.get('isUserMember'))
export const getIsUserLeader = createSelector([
  getApp], app => app.get('isUserLeader'))
export const getIsNavigationDrawerOpen = createSelector([
  getApp], app => app.get('isNavigationDrawerOpen'))
export const getIsInformationDrawerOpen = createSelector([
  getApp], app => app.get('isInformationDrawerOpen'))
export const getWithMorningTheme = createSelector([
  getApp], app => app.get('withMorningTheme'))
