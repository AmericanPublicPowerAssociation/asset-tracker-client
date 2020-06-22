import { WebMercatorViewport } from '@math.gl/web-mercator'
import {
  DrawCircleByDiameterMode,
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  DrawRectangleMode,
  ModifyMode,
  ViewMode,
} from '@nebula.gl/edit-modes'
import getRepresentativePoint from '@turf/point-on-feature'
import {
  ASSETS_MAP_LAYER_ID,
  BUSES_MAP_LAYER_ID,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_ADD_CONTROL,
  SKETCH_MODE_ADD_GENERATOR,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_POLE,
  SKETCH_MODE_ADD_POWER_QUALITY,
  SKETCH_MODE_ADD_STATION,
  SKETCH_MODE_ADD_STORAGE,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_SWITCH,
  SKETCH_MODE_ADD_TRANSFORMER,
  SKETCH_MODE_EDIT,
} from '../constants'

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_POLE]: DrawCircleByDiameterMode,
    [SKETCH_MODE_ADD_LINE]: DrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SWITCH]: DrawPointMode,
    [SKETCH_MODE_ADD_POWER_QUALITY]: DrawPointMode,
    [SKETCH_MODE_ADD_CONTROL]: DrawPointMode,
    [SKETCH_MODE_ADD_STORAGE]: DrawPointMode,
    [SKETCH_MODE_ADD_GENERATOR]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawRectangleMode,
    [SKETCH_MODE_ADD_STATION]: DrawPolygonMode,
    [SKETCH_MODE_EDIT]: ModifyMode,
  }[sketchMode]
  return mapMode || ViewMode
}

export function getMapViewStateFromBoundingBox(
  boundingBox,
  width,
  height,
) {
  if (!boundingBox.length) return
  const viewport = new WebMercatorViewport({ width, height })
  return viewport.fitBounds(boundingBox, { padding: 128, maxZoom: 20 })
}

export function getFeatureInfo({ editContext, updatedData }) {
  const { featureIndexes } = editContext
  const { features } = updatedData
  const featureIndex = featureIndexes[0]
  const feature = features[featureIndex]
  return { feature, featureIndex }
}

export function getPositionIndex({ editContext }) {
  const { positionIndexes } = editContext
  return positionIndexes[0]
}

export function findSelectedFeatureIndices(id, features) {
  const index = features.findIndex(f => f.properties.id === id)
  if (index < 0) return []
  return [index]
}

export function getRepresentativeXY(geojsonFeature) {
  return getRepresentativePoint(geojsonFeature).geometry.coordinates
}

export function updateFeature(asset, feature) {
  const assetId = asset.id
  const featureProperties = feature.properties
  featureProperties.id = assetId
  featureProperties.typeCode = asset.typeCode
}

export function getNearbyFeatures(lonlat, deckGL) {
  const { current } = deckGL
  const screenCoords = current.viewports[0].project(lonlat)

  const nearbyAssetFeatures = current.pickMultipleObjects({
    x: screenCoords[0],
    y: screenCoords[1],
    layerIds: [ASSETS_MAP_LAYER_ID],
    radius: PICKING_RADIUS_IN_PIXELS,
    depth: PICKING_DEPTH,
  }).map(info => info.object)
  console.log('nearbyAssetFeatures', nearbyAssetFeatures)

  const nearbyBusFeatures = current.pickMultipleObjects({
    x: screenCoords[0],
    y: screenCoords[1],
    layerIds: [BUSES_MAP_LAYER_ID],
    radius: PICKING_RADIUS_IN_PIXELS,
    depth: PICKING_DEPTH,
  }).map(info => info.object)
  console.log('nearbyBusFeatures', nearbyBusFeatures)

  return {
    nearbyAssetFeatures,
    nearbyBusFeatures,
  }
}

// TODO: Review all code below

export function getAssetsByLatLng(deckGL, position, radius) {
  const screenCoords = deckGL.current.viewports[0].project(position)

  return deckGL.current.pickMultipleObjects({
    x: screenCoords[0],
    y: screenCoords[1],
    layerIds: [ASSETS_MAP_LAYER_ID],
    radius: PICKING_RADIUS_IN_PIXELS * (radius || 2),
    depth: PICKING_DEPTH,
  })
}

export function getAssetsByScreenPosition(deckGL, screenPosition) {
  return deckGL.current.pickMultipleObjects({
    x:  screenPosition.x,
    y: screenPosition.y,
    layerIds: [ASSETS_MAP_LAYER_ID],
    radius: 6,
    depth: PICKING_DEPTH,
  })
}

export function getPickedFeature(event, select) {
  const info = getPickedInfo(event, select)
  if (!info) {
    return
  }
  const layer = info.layer
  const index = info.index
  return layer.props.data.features[index]
}

export function getPickedInterpretation(event, getBusId) {
  const thisGuideInfo = getPickedInfo(event, pick => pick.isGuide)
  if (!thisGuideInfo) {
    return { thatAssetId: getPickedAssetId(event) }
  }

  const assetFeatures = thisGuideInfo.layer.props.data.features
  const thisGuideFeature = thisGuideInfo.object
  const thisGuideFeatureProperties = thisGuideFeature.properties
  const thisAssetFeatureIndex = thisGuideFeatureProperties.featureIndex
  const thisAssetFeature = assetFeatures[thisAssetFeatureIndex]
  if (!thisAssetFeature) {
    return { thatAssetId: getPickedAssetId(event) }
  }
  const thisAssetId = thisAssetFeature.properties.id

  const thisGuideFeatureIndex = thisGuideFeatureProperties.positionIndexes[0]
  const connectionIndex = thisGuideFeatureIndex === 0 ? 0 : 1

  const busId = getBusId(event, thisAssetId)
  const thatAssetFeatureInfo = getPickedInfo(event, pick =>
    !pick.isGuide && pick.index !== thisAssetFeatureIndex)

  let thatAssetId
  if (thatAssetFeatureInfo) {
    const thatAssetFeatureIndex = thatAssetFeatureInfo.index
    const thatAssetFeature = assetFeatures[thatAssetFeatureIndex]
    thatAssetId = thatAssetFeature.properties.id
  }

  return { busId, connectionIndex, thisAssetId, thatAssetId }
}

export function getPickedAssetId(event) {
  const assetFeatureInfo = getPickedInfo(event, pick => !pick.isGuide)
  let assetId = null
  if (assetFeatureInfo) {
    const assetFeatures = assetFeatureInfo.layer.props.data.features
    const assetFeatureIndex = assetFeatureInfo.index
    const assetFeature = assetFeatures[assetFeatureIndex]
    assetId = assetFeature.properties.id
  }
  return assetId
}

export function getPickedInfo(event, select) {
  const picks = event.picks
  return picks && picks.find(select)
}

export function getBusesByLatLng(deckGL, position) {
  const screenCoords = deckGL.current.viewports[0].project(position)

  return deckGL.current.pickMultipleObjects({
    x: screenCoords[0],
    y: screenCoords[1],
    layerIds: [BUSES_MAP_LAYER_ID],
    radius: PICKING_RADIUS_IN_PIXELS * 2,
    depth: PICKING_DEPTH,
  })
}

export function getOffsetFromMetersToPosition(meters) {
  return meters * 0.0000089
}

export function moveLatitudeInMeters(coordinates, meters) {
  return [
    coordinates[0],
    coordinates[1] + getOffsetFromMetersToPosition(meters),
  ]
}

export function moveLongitudeInMeters(coordinates, meters) {
  return [
    coordinates[0] + getOffsetFromMetersToPosition(meters),
    coordinates[1],
  ]
}

// TODO: Review all code above
