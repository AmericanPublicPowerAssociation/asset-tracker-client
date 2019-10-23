import { createSelector } from 'reselect'
import { default as Vicenty } from 'geodesy/latlon-ellipsoidal-vincenty.js';
import LatLon from 'geodesy/latlon-spherical.js';
import { List, Map, fromJS } from 'immutable'
import { getRisks } from 'asset-report-risks'
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
export const getAssetTypeById = state => state.get(
  'assetTypeById')
export const getAssetById = state => state.get(
  'assetById')
export const getSortedAssetIds = state => state.get(
  'sortedAssetIds')
export const getFocusingAssetId = state => state.get(
  'focusingAssetId')
export const getFocusingAssetTasks = state => state.get(
  'focusingAssetTasks')
export const getSelectedAssetIds = state => state.get(
  'selectedAssetIds')
export const getRelatingAssetId = state => state.get(
  'relatingAssetId')
export const getLocatingAssetId = state => state.get(
  'locatingAssetId')
export const getRelatingAssetKey = state => state.get(
  'relatingAssetKey')
export const getAddingAsset = state => state.get(
  'addingAsset')
export const getEditingTask = state => state.get(
  'editingTask')
export const getAssetsFilterKeysByAttribute = state => state.get(
  'assetFilterKeysByAttribute')
export const getAssetsFilterValueByAttribute = state => state.get(
  'assetFilterValueByAttribute')
export const getTrackingAsset = state => state.get(
  'trackingAsset')
export const getMapViewport = state => state.get(
  'mapViewport')
export const getBaseMapStyleName = state => state.get(
  'baseMapStyleName')
export const getLogs = state => state.get(
  'logs')
export const getTaskById = state => state.get(
  'taskById')
export const getDashboards = state => state.get(
  'dashboards')


export const getValueMatchingAssets = createSelector([
  getAssetById,
  getAssetsFilterValueByAttribute,
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
  getAssetsFilterKeysByAttribute,
], (
  valueMatchingAssets,
  assetFilterKeysByAttribute,
) => {
  const selectedAssetTypeIds = assetFilterKeysByAttribute.get('typeId')
  return valueMatchingAssets
    .filter(asset => {
      const primaryAssetTypeId = asset.get('typeId')[0]
      return selectedAssetTypeIds.has(primaryAssetTypeId)
    })
})


export const getAssetCountByAssetTypeId = createSelector([
  getValueMatchingAssets,
], (
  valueMatchingAssets,
) => {
  return Map(valueMatchingAssets.reduce((countByAssetTypeId, asset) => {
    // const typeId = asset.get('typeId')
    const primaryAssetTypeId = asset.get('typeId')[0]
    countByAssetTypeId[primaryAssetTypeId] += 1
    return countByAssetTypeId
  }, new IntegerDefaultDict()))
})


export const getValueMatchingRisksAssetName = createSelector([
  getAssetsFilterValueByAttribute,
  getRisks,
], (
  assetFilterValueByAttribute,
  risks,
) => {
  const assetNameTerms = splitTerms(assetFilterValueByAttribute.get(
    'name').toLowerCase())
  return risks
    .filter(risk => {
      const lowercaseAssetName = risk.get('assetName').toLowerCase()
      return assetNameTerms.every(term => lowercaseAssetName.includes(term))
    })
})


export const getVisibleRisks = createSelector([
  getValueMatchingRisksAssetName,
  getAssetsFilterKeysByAttribute,
  getAssetById,
], (
  valueMatchingRisksAssetName,
  assetFilterKeysByAttribute,
  assetById,
) => {
  const selectedAssetTypeIds = assetFilterKeysByAttribute.get('typeId')
  return valueMatchingRisksAssetName
    .filter(risk => {
      const assetId = risk.get('assetId')
      const asset = assetById.get(assetId)
      if ( !asset ){
        return false
      }
      const primaryAssetTypeId = asset.get('typeId')[0]
      return selectedAssetTypeIds.has(primaryAssetTypeId)
    })
    .slice(0, MAXIMUM_ASSET_LIST_LENGTH)
})


export const getRiskCountByAssetTypeId = createSelector([
  getValueMatchingRisksAssetName,
  getAssetById,
], (
  valueMatchingRisksAssetName,
  assetById,
) => {
  return Map(valueMatchingRisksAssetName.reduce(
    (riskCountByAssetTypeId, risk) => {
      const assetId = risk.get('assetId')
      const asset = assetById.get(assetId)
      if (asset) {
        const primaryAssetTypeId = asset.get('typeId')[0]
        riskCountByAssetTypeId[primaryAssetTypeId] += 1
      }
      return riskCountByAssetTypeId
    },
    new IntegerDefaultDict()))
})


export const getFocusingAsset = createSelector([
  getFocusingAssetId,
  getAssetById,
], (
  focusingAssetId,
  assetById,
) => assetById.get(focusingAssetId, Map()))


export const getSelectedAssets = createSelector([
  getSelectedAssetIds,
  getAssetById,
], (
  selectedAssetIds,
  assetById,
) => {
  const assets = {}
  selectedAssetIds.reduce( (obj, assetId) => {
    const asset = assetById.get(assetId)
    obj[assetId] = asset
    return obj
  }, assets)
  return Map(assets)
})


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


export const getMapBoundBox = createSelector([
  getMapViewport,
], (
  mapViewport,
) => {
  return mapViewport.get('bounds')
})


export const getMapBoundBoxCenter = createSelector([
  getMapBoundBox,
], (
  mapBoundBox
) => {
  if (!mapBoundBox) {
    return null
  }
  const [min, max] = mapBoundBox.toJS()
  const minPoint = new LatLon(min[1], min[0])
  const maxPoint = new LatLon(max[1], max[0])
  const midPoint = minPoint.midpointTo(maxPoint)
  return List([midPoint.lon, midPoint.lat])
})


export const getVisibleAssetsByProximity = createSelector([
  getMapBoundBoxCenter,
  getVisibleAssets,
  getFocusingAsset
], (
  mapBoundBoxCenter,
  visibleAssets,
  focusingAsset,
) => {
  let centerPoint = focusingAsset.get('location')
  if (!centerPoint) {
    centerPoint = mapBoundBoxCenter
  }
  if (!centerPoint) {
    return visibleAssets
  }
  centerPoint = new Vicenty(centerPoint.get(1), centerPoint.get(0))
  const assets = visibleAssets
    .map((asset, key) => {
      let assetPoint = asset.get('location') 
      let dist = null
      if (assetPoint) {
        assetPoint = new Vicenty(assetPoint.get(1), assetPoint.get(0))
        dist = centerPoint.distanceTo(assetPoint) //meters
      }
      return asset.merge({distance: dist})
    })
    .filter((asset, key) => (
      asset.get('distance') != null &&
      !isNaN(asset.get('distance'))
    ))

  return assets.sort( (assetA, assetB) => {
    const distA = assetA.get('distance')
    const distB = assetB.get('distance')

    let comparison = 0
    if (distA > distB) {
      comparison = 1
    }
    else if (distA < distB) {
      comparison = -1
    }
    return comparison
  }).slice(0, MAXIMUM_ASSET_LIST_LENGTH)
})

export const getConnectionGraph = createSelector([
  getAssetById,
], (
  assetById,
) => {
  const connectionGraph = {}
  assetById.forEach((asset, id) => {
    const connectedIds = asset.get('connectedIds', List())
    if (!connectedIds.size) return
    const weightByConnectedId = connectedIds.reduce((d, id) => {
      d[id] = 1
      return d
    }, {})
    connectionGraph[id] = weightByConnectedId
  })
  return connectionGraph
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
  getAssetsFilterKeysByAttribute,
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

      let layerColor = assetType.get('featureColor')
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


export const getInteractiveLayerIds = createSelector([
  getMapLayers,  
], (
  mapLayers,
) => mapLayers.map(layer => layer.id))


export const getMapStyle = createSelector([
  getMapSources,
  getMapLayers,
], (
  mapSources,
  mapLayers,
) => ({sources: mapSources.toJS(), layers: mapLayers.toJS()}))


export const getIsNavigationDrawerOpen = createSelector([
  getApp], app => app.get('isNavigationDrawerOpen'))
export const getIsInformationDrawerOpen = createSelector([
  getApp], app => app.get('isInformationDrawerOpen'))
export const getWithMorningTheme = createSelector([
  getApp], app => app.get('withMorningTheme'))
