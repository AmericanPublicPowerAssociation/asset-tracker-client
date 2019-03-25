import { createSelector } from 'reselect'
import { fromJS, Map, List } from 'immutable'
import {
  ASSET_TYPE_BY_ID,
  MAXIMUM_LIST_LENGTH,
  KEY_PREFIX,
  MAP_STYLE,
  PROPERTY_MINIMUM_VALUE,
  PROPERTY_MAXIMUM_VALUE,
} from '../constants'
import {
  normalizeNumber,
} from '../macros'

const getAssetById = state => state.assetById
const getAssetLocationById = state => state.assetLocationById
const getSortedAssetIds = state => state.sortedAssetIds
const getSelectedAssetTypeIds = state => state.selectedAssetTypeIds
const getSelectedAssetIds = state => state.selectedAssetIds
const getFocusingAssetId = state => state.focusingAssetId
const getLocatingAssetId = state => state.locatingAssetId
const getRelatingAssetId = state => state.relatingAssetId
const getRelatingAssetKey = state => state.relatingAssetKey
const getFeatureColorAttribute = state => state.featureColorAttribute
const getFeatureSizeAttribute = state => state.featureSizeAttribute

export const getFocusingAsset = createSelector(
  [getAssetById, getFocusingAssetId],
  (assetById, focusingAssetId) => assetById.get(focusingAssetId, Map()))

export const getParentIds = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get('parentIds', List()))

export const getParentAssets = createSelector(
  [getAssetById, getParentIds],
  (assetById, parentIds) => parentIds.map(assetId => assetById.get(assetId)))

export const getChildIds = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get('childIds', List()))

export const getChildAssets = createSelector(
  [getAssetById, getChildIds],
  (assetById, childIds) => childIds.map(assetId => assetById.get(assetId)))

export const getVisibleAssets = createSelector([
  getSelectedAssetIds,
  getSortedAssetIds,
  getSelectedAssetTypeIds,
  getAssetById,
], (
  selectedAssetIds,
  sortedAssetIds,
  selectedAssetTypeIds,
  assetById,
) => (selectedAssetIds.isEmpty() ? sortedAssetIds : selectedAssetIds)
  .map(assetId => assetById.get(assetId))
  .filter(asset => selectedAssetTypeIds.includes(asset.get('typeId')))
  .slice(0, MAXIMUM_LIST_LENGTH))

export const getFocusingAssetLocation = createSelector(
  [getAssetLocationById, getFocusingAssetId, getParentIds],
  (assetLocationById, focusingAssetId, parentIds) => {
    let assetLocation = assetLocationById.get(focusingAssetId)
    if (assetLocation) return assetLocation
    for (const parentId of parentIds) {
      assetLocation = assetLocationById.get(parentId)
      if (assetLocation) return assetLocation
    }
    return Map()
  })

export const getLocatingAsset = createSelector(
  [getAssetById, getLocatingAssetId],
  (assetById, locatingAssetId) => assetById.get(locatingAssetId, Map()))

export const getLocatingAssetLocation = createSelector(
  [getAssetLocationById, getLocatingAssetId],
  (assetLocationById, locatingAssetId) => assetLocationById.get(
    locatingAssetId, Map()))

export const getRelatingAsset = createSelector(
  [getAssetById, getRelatingAssetId],
  (assetById, relatingAssetId) => assetById.get(relatingAssetId, Map()))

export const getConnectedAssets = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get(
    'connectedIds', List()).map(assetId => assetById.get(assetId)))

export const getRelatedAssetTypeIds = createSelector(
  [getRelatingAsset, getRelatingAssetKey],
  (relatingAsset, relatingAssetKey) => relatingAsset.get('typeId') ?
    ASSET_TYPE_BY_ID[relatingAsset.get('typeId')][relatingAssetKey] :
    [])

export const getRelatedAssetIds = createSelector(
  [getRelatingAsset, getRelatingAssetKey],
  (relatingAsset, relatingAssetKey) => relatingAsset.get(relatingAssetKey, []))

export const getFeatureGeometryById = createSelector(
  [getAssetLocationById, getAssetById],
  (assetLocationById, assetById) => {
    const featureGeometryById = {}
    const poleParentIds = {}
    assetLocationById.forEach((location, id) => {
      const asset = assetById.get(id)
      const assetGeometry = {type: 'Point', coordinates: [
        location.get(0),
        location.get(0)]}
      featureGeometryById[id] = assetGeometry
      const assetTypeId = asset.get('typeId')
      for (const childId of asset.get('childIds', [])) {
        featureGeometryById[childId] = assetGeometry
      }
      if (assetTypeId === 'p') {
        for (const parentId of asset.get('parentIds', [])) {
          poleParentIds[parentId] = true
        }
      }
    })
    for (const parentId in poleParentIds) {
      const asset = assetById.get(parentId)
      const assetCoordinates = []
      for (const childId of asset.get('childIds', [])) {
        const assetLocation = assetLocationById.get(childId)
        if (!assetLocation) continue
        assetCoordinates.push([
          assetLocation.get('longitude'),
          assetLocation.get('latitude')])
      }
      const assetGeometry = {type: 'LineString', coordinates: assetCoordinates}
      featureGeometryById[parentId] = assetGeometry
    }
    return fromJS(featureGeometryById)
  })

export const getMapSources = createSelector(
  [
    getFeatureGeometryById,
    getFeatureColorAttribute,
    getFeatureSizeAttribute,
    getAssetById,
  ], (
    featureGeometryById,
    featureColorAttribute,
    featureSizeAttribute,
    assetById,
  ) => {
    if (featureGeometryById.isEmpty()) return Map()
    // const assetId = featureGeometryById.keySeq().first()
    // const asset = assetById.get(assetId)
    const defineGetFeatureProperty = attributeName => {
      const values = assetById.valueSeq().map(
        asset => asset.get(attributeName))
      /*
      if (typeof asset.get(attributeName) === 'string') {
        const uniqueValues = values.toSet().toList()
        return asset => normalizeNumber(
          uniqueValues.indexOf(asset.get(attributeName)),
          0,
          uniqueValues.count() - 1,
          PROPERTY_MINIMUM_VALUE,
          PROPERTY_MAXIMUM_VALUE)
      } else {
      */
      return asset => normalizeNumber(
        asset.get(attributeName, 0),
        values.min(),
        values.max(),
        PROPERTY_MINIMUM_VALUE,
        PROPERTY_MAXIMUM_VALUE)
      // }
    }
    // const getFeatureSize = defineGetFeatureProperty(featureSizeAttribute)
    const getFeatureSize = defineGetFeatureProperty('size')
    const featuresByTypeId = featureGeometryById.reduce((
      featuresByTypeId,
      featureGeometry,
      assetId,
    ) => {
      const asset = assetById.get(assetId)
      const assetTypeId = asset.get('typeId')
      // const featureColor = {}[asset[featureColorAttribute]]
      const featureProperties = {
        id: assetId,
        // color: getFeatureColor(asset),
        size: getFeatureSize(asset),
        // size: 5,
      }
      const feature = fromJS({
        type: 'Feature',
        properties: featureProperties,
        geometry: featureGeometry,
      })
      return featuresByTypeId.set(assetTypeId, featuresByTypeId.get(
        assetTypeId, List()).push(feature))
    }, Map())

    return featuresByTypeId.mapEntries(([assetTypeId, features]) => [
      KEY_PREFIX + assetTypeId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features,
        }},
    ]).toJS()

  })

export const getMapLayers = createSelector([
  getSelectedAssetTypeIds,
  getMapSources,
], (
  selectedAssetTypeIds,
  mapSources,
) => selectedAssetTypeIds
    .filter(typeId => KEY_PREFIX + typeId in mapSources)
    .map(typeId => {
      const isLine = typeId === 'l'
      const layerColor = {
        p: 'black',
        l: 'yellow',
        m: 'blue',
        t: 'pink',
        x: 'magenta',
        q: 'green',
        c: 'violet',
        b: 'gray',
        o: 'brown',
        g: 'darkred',
        s: 'orange',
        S: 'red',
        X: 'white',
      }[typeId]
      return {
        id: KEY_PREFIX + typeId,
        type: isLine  ? 'line' : 'circle',
        source: KEY_PREFIX + typeId,
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
    }))

export const getMapStyle = createSelector([
  getMapSources,
  getMapLayers,
], (
  mapSources,
  mapLayers,
) => MAP_STYLE.mergeDeep({sources: mapSources, layers: mapLayers}))

export const getInteractiveLayerIds = createSelector([
  getMapLayers,
], (
  mapLayers,
) => mapLayers.map(layer => layer.id))
