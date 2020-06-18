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
    return {thatAssetId: getPickedAssetId(event)}
  }

  const assetFeatures = thisGuideInfo.layer.props.data.features
  const thisGuideFeature = thisGuideInfo.object
  const thisGuideFeatureProperties = thisGuideFeature.properties
  const thisAssetFeatureIndex = thisGuideFeatureProperties.featureIndex
  const thisAssetFeature = assetFeatures[thisAssetFeatureIndex]
  if (!thisAssetFeature) {
    return {thatAssetId: getPickedAssetId(event)}
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

  return {busId, connectionIndex, thisAssetId, thatAssetId}
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

export function getPickedEditHandle(picks) {
  // Taken from nebula.gl > mode-handler.js
  const info = picks && picks.find(pick => pick.isGuide)
  if (info) {
    return info.object
  }
  return null
}

export function getMapViewStateFromBoundingBox(boundingBox, width, height, maxZoom = 15) {
  if (!boundingBox.length) {
    return
  }
  const viewport = new WebMercatorViewport({ width, height })
  return viewport.fitBounds(boundingBox, { padding: 20, maxZoom })

}

export function getDeckGLNearbyObjects(obj) {
  const  {
    deckGL,
    screenCoords,
    layerId,
    pickingRadius = PICKING_RADIUS_IN_PIXELS,
    pickingDepth = PICKING_DEPTH,
  } = obj
  const nearbyObjectInfos = deckGL.current.pickMultipleObjects({
    x: screenCoords[0],
    y: screenCoords[1],
    layerIds: [layerId],
    radius: pickingRadius,
    depth: pickingDepth,
  })
  return nearbyObjectInfos
} 

export function getFeaturePack({ editContext, updatedData }) {
  const { featureIndexes } = editContext
  console.assert(featureIndexes.length === 1)
  const featureIndex = featureIndexes[0]
  const { features } = updatedData
  const feature = features[featureIndex]
  return [featureIndex, feature]
}

export function updateFeature(feature, asset) {
  const featureProperties = feature.properties
  featureProperties.id = asset.id
  featureProperties.typeCode = asset.typeCode
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
>>>>>>> develop
