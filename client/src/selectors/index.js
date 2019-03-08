import { createSelector } from 'reselect'
import { fromJS, Map, List } from 'immutable'
import {
  ASSET_TYPE_BY_ID,
  MAXIMUM_LIST_LENGTH,
  KEY_PREFIX,
  // PROPERTY_MINIMUM_VALUE,
  // PROPERTY_MAXIMUM_VALUE,
} from '../constants'
import {
  // normalizeNumber,
} from '../macros'

const getAssetById = state => state.assetById
const getAssetLocationById = state => state.assetLocationById
const getSortedAssetIds = state => state.sortedAssetIds
const getSelectedAssetTypeIds = state => state.selectedAssetTypeIds
const getFocusingAssetId = state => state.focusingAssetId
const getLocatingAssetId = state => state.locatingAssetId
const getRelatingAssetId = state => state.relatingAssetId
const getRelatingAssetKey = state => state.relatingAssetKey
const getFeatureColorAttribute = state => state.featureColorAttribute
const getFeatureSizeAttribute = state => state.featureSizeAttribute

export const getFocusingAsset = createSelector(
  [getAssetById, getFocusingAssetId],
  (assetById, focusingAssetId) => assetById.get(focusingAssetId, Map()))

export const getFocusingAssetLocation = createSelector(
  [getAssetLocationById, getFocusingAssetId],
  (assetLocationById, focusingAssetId) => assetLocationById.get(
    focusingAssetId, Map()))

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

export const getParentAssets = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get(
    'parentIds', List()).map(assetId => assetById.get(assetId)))

export const getChildAssets = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get(
    'childIds', List()).map(assetId => assetById.get(assetId)))

export const getVisibleAssets = createSelector(
  [getAssetById, getSortedAssetIds, getSelectedAssetTypeIds],
  (assetById, sortedAssetIds, selectedAssetTypeIds) => sortedAssetIds
    .slice(0, MAXIMUM_LIST_LENGTH)
    .map(assetId => assetById.get(assetId))
    .filter(asset => selectedAssetTypeIds.includes(asset.get('typeId'))))

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
        location.get('longitude'),
        location.get('latitude')]}
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
    /*
    const assetId = featureGeometryById.keySeq().first()
    const asset = assetById.get(assetId)
    const defineGetFeatureProperty = attributeName => {
      const values = assetById.valueSeq().map(
        asset => asset.get(attributeName))
      if (typeof asset.get(attributeName) === 'string') {
        const uniqueValues = values.toSet().toList()
        return asset => normalizeNumber(
          uniqueValues.indexOf(asset.get(attributeName)),
          0,
          uniqueValues.count() - 1,
          PROPERTY_MINIMUM_VALUE,
          PROPERTY_MAXIMUM_VALUE)
      } else {
        return asset => normalizeNumber(
          asset.get(attributeName, 0),
          values.min(),
          values.max(),
          PROPERTY_MINIMUM_VALUE,
          PROPERTY_MAXIMUM_VALUE)
      }
    }
    */
    // const getFeatureSize = defineGetFeatureProperty(featureSizeAttribute)
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
        // size: getFeatureSize(asset),
        size: 5,
      }
      const feature = fromJS({
        type: 'Feature',
        properties: featureProperties,
        geometry: featureGeometry,
      })
      return featuresByTypeId.set(assetTypeId, featuresByTypeId.get(
        assetTypeId, List()).push(feature))
    }, Map())

    const x = featuresByTypeId.mapEntries(([assetTypeId, features]) => [
      KEY_PREFIX + assetTypeId,
      {type: 'geojson', data: {type: 'FeatureCollection', features: features}},
    ]).toJS()
    console.log(x)
    return x

  })
