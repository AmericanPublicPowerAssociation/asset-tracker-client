import { createSelector } from 'reselect'
import { List, Map, fromJS } from 'immutable'
import {
  FOCUSING_COLOR,
  KEY_PREFIX,
  MAXIMUM_ASSET_LIST_LENGTH,
} from './constants'
import {
  IntegerDefaultDict,
  splitTerms,
} from './macros'
import {
  getFeatureKey,
  getFeatureSize,
} from './routines'


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
export const getBaseMapStyleName = state => state.get(
  'baseMapStyleName')


export const getValueMatchingAssets = createSelector([
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
  getValueMatchingAssets,
  getAssetFilterKeysByAttribute,
], (
  valueMatchingAssets,
  assetFilterKeysByAttribute,
) => {
  const selectedAssetTypeIds = assetFilterKeysByAttribute.get('typeId')
  return valueMatchingAssets
    .filter(asset => selectedAssetTypeIds.has(asset.get('typeId')))
    .slice(0, MAXIMUM_ASSET_LIST_LENGTH)
})


export const getCountByAssetTypeId = createSelector([
  getValueMatchingAssets,
], (
  valueMatchingAssets,
) => {
  return Map(valueMatchingAssets.reduce((countByAssetTypeId, asset) => {
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


export const getFocusingAssetLocation = createSelector([
  getFocusingAsset,
], (
  focusingAsset,
) => focusingAsset.get('location', List()))


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
  getLocatingAsset,
], (
  locatingAsset,
) => locatingAsset.get('location', List()))


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


export const getMapSources = createSelector([
  getValueMatchingAssets,
  getAssetTypeById,
], (
  valueMatchingAssets,
  assetTypeById,
) => {
  if (valueMatchingAssets.isEmpty()) {
    return Map()
  }
  const featuresByKey = valueMatchingAssets
    .filter(asset => asset.has('geometry'))
    .reduce((
      featuresByKey,
      asset,
    ) => {
      const id = asset.get('id')
      const size = getFeatureSize(asset, assetTypeById)
      const properties = {id, size}
      const geometry = asset.get('geometry')
      const feature = fromJS({type: 'Feature', properties, geometry})
      const key = getFeatureKey(asset)
      return featuresByKey.update(
        key, List(), features => features.push(feature))
    }, Map())
    return featuresByKey.mapEntries(([key, features]) => [
      KEY_PREFIX + key, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features,
        },
      },
    ])
})


export const getMapLayers = createSelector([
  getMapSources,
  getFocusingAssetId,
  getAssetFilterKeysByAttribute,
  getAssetTypeById,
], (
  mapSources,
  focusingAssetId,
  assetFilterKeysByAttribute,
  assetTypeById,
) => {
  const selectedKeys = assetFilterKeysByAttribute.get('typeId')
  return selectedKeys
    .filter(key => mapSources.has(KEY_PREFIX + key))
    .map(key => {
      const keyTerms = key.split('-')
      const typeId = keyTerms[0]
      const primaryTypeId = typeId[0]
      const assetType = assetTypeById.get(primaryTypeId)
      const isLine = 'l' === primaryTypeId

      let layerColor = assetType.get('color')
      if (isLine) {
        const matchExpression = ['match', ['get', 'id']]
        if (focusingAssetId) {
          matchExpression.push(focusingAssetId, FOCUSING_COLOR)
        }
        matchExpression.push(layerColor)
        if (matchExpression.length > 3) {
          layerColor = matchExpression
        }
      }

      return {
        id: KEY_PREFIX + key,
        source: KEY_PREFIX + key,
        type: isLine ? 'line' : 'circle',
        paint: isLine ? {
          'line-width': ['get', 'size'],
          'line-color': layerColor,
          'line-opacity': 0.8,
        } : {
          'circle-radius': ['get', 'size'],
          'circle-color': layerColor,
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': 0.8,
        },
      }
    })
})


export const getMapStyle = createSelector([
  getMapSources,
  getMapLayers,
], (
  mapSources,
  mapLayers,
) => ({sources: mapSources.toJS(), layers: mapLayers.toJS()}))


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
