import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import {
  MAXIMUM_ASSET_LIST_LENGTH,
} from './constants'
import {
  IntegerDefaultDict,
  splitTerms,
} from './macros'


export const getApp = state => state.get(
  'app')
export const getSortedAssetIds = state => state.get(
  'sortedAssetIds')
export const getAssetById = state => state.get(
  'assetById')
export const getAssetTypeById = state => state.get(
  'assetTypeById')
export const getFocusingAssetId = state => state.get(
  'focusingAssetId')
export const getRelatingAssetId = state => state.get(
  'relatingAssetId')
export const getLocatingAssetId = state => state.get(
  'locatingAssetId')
export const getRelatingAssetKey = state => state.get(
  'relatingAssetKey')
export const getAddingAsset = state => state.get(
  'addingAsset')
export const getAssetFilterKeysByAttribute = state => state.get(
  'assetFilterKeysByAttribute')
export const getAssetFilterValueByAttribute = state => state.get(
  'assetFilterValueByAttribute')
export const getTrackingAsset = state => state.get(
  'trackingAsset')
export const getMapViewport = state => state.get(
  'mapViewport')
export const getMapStyle = state => state.get(
  'mapStyle')
export const getBaseMapStyleName = state => state.get(
  'baseMapStyleName')


export const getAssetLocationById = createSelector([
  getAssetById,
], (
  assetById,
) => assetById.map(asset => asset.get('location')))


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
  return Map(matchingAssets.reduce((countByAssetTypeId, asset) => {
    const typeId = asset.get('typeId')
    countByAssetTypeId[typeId] += 1
    return countByAssetTypeId
  }, new IntegerDefaultDict()))
})


export const getFocusingAsset = createSelector([
  getFocusingAssetId,
  getAssetById,
], (
  focusingAssetId,
  assetById,
) => assetById.get(focusingAssetId, Map()))


export const getFocusingAssetType = createSelector([
  getFocusingAsset,
  getAssetTypeById,
], (
  focusingAsset,
  assetTypeById,
) => {
  const focusingAssetTypeId = focusingAsset.get('typeId')
  if (!focusingAssetTypeId) {
    return Map()
  }
  return assetTypeById.get(focusingAssetTypeId[0])
})


export const getRelatingAsset = createSelector([
  getRelatingAssetId,
  getAssetById,
], (
  relatingAssetId,
  assetById,
) => assetById.get(relatingAssetId, Map()))


export const getLocatingAsset = createSelector([
  getLocatingAssetId,
  getAssetById,
], (
  locatingAssetId,
  assetById,
) => assetById.get(locatingAssetId, Map()))


export const getLocatingAssetLocation = createSelector([
  getLocatingAssetId,
  getAssetLocationById,
], (
  locatingAssetId,
  assetLocationById,
) => assetLocationById.get(locatingAssetId, List()))


export const getParentIds = createSelector([
  getFocusingAsset,
], focusingAsset => focusingAsset.get('parentIds', List()))
export const getChildIds = createSelector([
  getFocusingAsset,
], focusingAsset => focusingAsset.get('childIds', List()))
export const getConnectedIds = createSelector([
  getFocusingAsset,
], focusingAsset => focusingAsset.get('connectedIds', List()))


export const getParentAssets = createSelector([
  getParentIds,
  getAssetById,
], (
  parentIds,
  assetById,
) => parentIds.map(assetId => assetById.get(assetId)))


export const getChildAssets = createSelector([
  getChildIds,
  getAssetById,
], (
  childIds,
  assetById,
) => childIds.map(assetId => assetById.get(assetId)))


export const getConnectedAssets = createSelector([
  getConnectedIds,
  getAssetById,
], (
  connectedIds,
  assetById,
) => connectedIds.map(assetId => assetById.get(assetId)))


export const getRelatedAssetIds = createSelector([
  getRelatingAsset,
  getRelatingAssetKey,
], (
  relatingAsset,
  relatingAssetKey,
) => relatingAsset.get(relatingAssetKey, List()))


export const getRelatedAssetTypeIds = createSelector([
  getRelatingAsset,
  getRelatingAssetKey,
  getAssetTypeById,
], (
  relatingAsset,
  relatingAssetKey,
  assetTypeById,
) => {
  const relatingAssetTypeId = relatingAsset.get('typeId')
  return relatingAssetTypeId ?
    assetTypeById.get(relatingAssetTypeId).get(relatingAssetKey) :
    List()
})


export const getFocusingAssetLocation = createSelector([
  getFocusingAssetId,
  getAssetLocationById,
  getParentIds,
], (
  focusingAssetId,
  assetLocationById,
  parentIds,
) => {
  let assetLocation = assetLocationById.get(focusingAssetId)
  return assetLocation ? assetLocation : List()
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
