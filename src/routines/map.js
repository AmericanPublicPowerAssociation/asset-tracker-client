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
  SKETCH_MODE_EDIT_VERTEX_ADD,
  SKETCH_MODE_EDIT_VERTEX_MOVE,
  SKETCH_MODE_EDIT_VERTEX_REMOVE,
  // SKETCH_MODE_EDIT_VERTEX_SPLIT_LINE,
} from '../constants'

class AddMoveVertexMode extends ModifyMode {
  handleClick(event, props) {
    console.log('props', props)
    // Taken from nebula.gl > edit-modes/utils
    const picks = event.picks
    const pickedEditHandle = picks && picks
      .filter(pick => (
        pick.isGuide && pick.object.properties.guideType === 'editHandle'))
      .map(pick => pick.object) || []
    const pickedExistingHandle = pickedEditHandle.find(
      ({ properties }) => properties.featureIndex >= 0 && properties.editHandleType === 'existing')
    if (pickedExistingHandle) return
    super.handleClick(event, props)
  }

  handleDragging(event, props) {
    super.handleDragging(event, props)
  }

  handleStartDragging(event, props) {
    super.handleStartDragging(event, props)
  }

  handleStopDragging(event, props) {
    super.handleStopDragging(event, props)
  }
}

class MoveVertexMode extends ModifyMode {
  handleClick(event, props) {}

  handleDragging(event, props) {
    super.handleDragging(event, props)
  }

  handleStartDragging(event, props) {}

  handleStopDragging(event, props) {
    super.handleStopDragging(event, props)
  }
}

class RemoveVertexMode extends ModifyMode {
  // disables moving lines and only allows to remove vertex
  handleClick(event, props) {
    // Taken from nebula.gl > edit-modes/utils
    const picks = event.picks
    const pickedEditHandle = picks && picks
      .filter(pick => (
        pick.isGuide && pick.object.properties.guideType === 'editHandle'))
      .map(pick => pick.object) || []
    const pickedIntermediateHandle = pickedEditHandle.find(
      ({ properties }) => properties.featureIndex >= 0 && properties.editHandleType === 'intermediate')
    if (pickedIntermediateHandle) return
    super.handleClick(event, props)
  }

  getGuides(props) {
    props['lastPointerMoveEvent'] = null
    return super.getGuides(props)
  }

  handleDragging() {}
  handleStartDragging() {}
  handleStopDragging() {}
}

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
    [SKETCH_MODE_EDIT_VERTEX_ADD]: AddMoveVertexMode,
    [SKETCH_MODE_EDIT_VERTEX_MOVE]: MoveVertexMode, 
    [SKETCH_MODE_EDIT_VERTEX_REMOVE]: RemoveVertexMode,
    // add split line mode
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

export function getNearbyFeatures(
  lonlat,
  deckGL,
  selectedAssetId,
  selectedBusId,
) {
  const { current } = deckGL
  const screenXY = current.viewports[0].project(lonlat)

  const nearbyAssetFeatures = current.pickMultipleObjects({
    x: screenXY[0],
    y: screenXY[1],
    layerIds: [ASSETS_MAP_LAYER_ID],
  }).map(info =>
    info.object,
  ).filter(f =>
    f.properties.id !== selectedAssetId &&
    !f.properties.guideType,
  )

  const nearbyBusFeatures = current.pickMultipleObjects({
    x: screenXY[0],
    y: screenXY[1],
    layerIds: [BUSES_MAP_LAYER_ID],
  }).map(
    info => info.object,
  ).filter(
    f => f.properties.id !== selectedBusId,
  )

  return {
    nearbyAssetFeatures,
    nearbyBusFeatures,
    screenXY,
  }
}

// TODO: Review all code below

export function getAssetsByLatLng(deckGL, position, radius) {
  const screenCoords = deckGL.current.viewports[0].project(position)

  return deckGL.current.pickMultipleObjects({
    x: screenCoords[0],
    y: screenCoords[1],
    layerIds: [ASSETS_MAP_LAYER_ID],
  })
}

export function getAssetsByScreenPosition(deckGL, screenPosition) {
  return deckGL.current.pickMultipleObjects({
    x:  screenPosition.x,
    y: screenPosition.y,
    layerIds: [ASSETS_MAP_LAYER_ID],
    radius: 6,
  })
}

export function getBusesByLatLng(deckGL, position) {
  const screenCoords = deckGL.current.viewports[0].project(position)

  return deckGL.current.pickMultipleObjects({
    x: screenCoords[0],
    y: screenCoords[1],
    layerIds: [BUSES_MAP_LAYER_ID],
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
