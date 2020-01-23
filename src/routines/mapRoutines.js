import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ViewMode,
} from 'nebula.gl'
import translateFeature from '@turf/transform-translate'
import {
  ADD_LINE,
  ADD_TRANSFORMER,
  ADD_SUBSTATION,
  BUS_DISTANCE_IN_KILOMETERS,
} from '../constants'

export function getMapMode(sketchMode) {
  const mapMode = {
    [ADD_LINE]: DrawLineStringMode,
    [ADD_TRANSFORMER]: DrawPointMode,
    [ADD_SUBSTATION]: DrawPolygonMode,
  }[sketchMode]
  return mapMode || ViewMode
}

export function getBusFeatures(assetFeatures, assetById) {
  const busFeatures = []
  const assetIdByBusId = {}

  for (let i = 0; i < assetFeatures.length; i++) {
    const assetFeature = assetFeatures[i]
    const getBusFeaturesForGeometry = {
      'Point': getBusFeaturesForPoint,
      'LineString': getBusFeaturesForLine,
    }[assetFeature.geometry.type]
    if (!getBusFeaturesForGeometry) continue

    const { assetId } = assetFeature.properties
    if (!assetId) continue

    const asset = assetById[assetId]
    const connections = asset.connections
    if (!connections) continue

    busFeatures.push(...getBusFeaturesForGeometry(
      assetFeature, connections, assetIdByBusId))
  }

  for (let i = 0; i < busFeatures.length; i++) {
    const busProperties = busFeatures[i].properties
    const busId = busProperties.busId
    busProperties.assetId = assetIdByBusId[busId]
  }

  return busFeatures
}

function getBusFeaturesForPoint(assetFeature, connections, assetIdByBusId) {
  const busCount = connections.length
  const busAngleIncrement = 360 / busCount
  const { assetId } = assetFeature.properties

  const busFeatures = []

  for (let i = 0; i < busCount; i++) {
    const connection = connections[i]
    const busId = connection.busId
    const hasBusFeature = busId in assetIdByBusId
    assetIdByBusId[busId] = assetId  // Have buses belong to point assets
    if (hasBusFeature) continue

    const busAngle = busAngleIncrement * i
    const busGeometry = translateFeature(
      assetFeature,
      BUS_DISTANCE_IN_KILOMETERS,
      busAngle,
    ).geometry

    busFeatures.push({
      type: 'Feature',
      properties: {busId},
      geometry: busGeometry,
    })
  }

  return busFeatures
}

function getBusFeaturesForLine(assetFeature, connections, assetIdByBusId) {
  const assetXYs = assetFeature.geometry.coordinates
  const { assetId } = assetFeature.properties

  const busCount = connections.length
  const busXYs = [
    assetXYs[0],
    assetXYs[assetXYs.length - 1],
  ]

  const busFeatures = []

  for (let i = 0; i < busCount; i++) {
    const connection = connections[i]
    const busId = connection.busId
    const hasBusFeature = busId in assetIdByBusId
    if (hasBusFeature) continue
    assetIdByBusId[busId] = assetId

    busFeatures.push({
      type: 'Feature',
      properties: {busId},
      geometry: {
        type: 'Point',
        coordinates: busXYs[i],
      }
    })
  }

  return busFeatures
}
