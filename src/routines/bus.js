import translateFeature from '@turf/transform-translate'
import {
  BUS_DISTANCE_IN_KILOMETERS,
} from '../constants'

export function getBusFeatures(assetFeatures, assetById) {
  const busIds = []
  const busFeatures = []

  for (let i = 0; i < assetFeatures.length; i++) {
    const assetFeature = assetFeatures[i]
    const getBusFeaturesForGeometry = {
      'Point': getBusFeaturesForPoint,
      'LineString': getBusFeaturesForLine,
    }[assetFeature.geometry.type]
    if (!getBusFeaturesForGeometry) continue

    const assetId = assetFeature.properties.id
    if (!assetId) continue

    const asset = assetById[assetId]
    const connections = asset.connections
    if (!connections) continue

    busFeatures.push(...getBusFeaturesForGeometry(
      assetFeature, connections, busIds))
  }

  return busFeatures
}

function getBusFeaturesForPoint(assetFeature, connections, busIds) {
  const busFeatures = []
  const busCount = connections.length
  const busAngleIncrement = 360 / busCount

  for (let i = 0; i < busCount; i++) {
    const connection = connections[i]
    const busId = connection.busId
    if (busIds.includes(busId)) continue

    const busAngle = busAngleIncrement * i
    const busGeometry = translateFeature(
      assetFeature,
      BUS_DISTANCE_IN_KILOMETERS,
      busAngle,
    ).geometry
    busFeatures.push({
      type: 'Feature',
      properties: {id: busId},
      geometry: busGeometry,
    })
    busIds.push(busId)
  }

  return busFeatures
}

function getBusFeaturesForLine(assetFeature, connections, busIds) {
  const busFeatures = []
  const assetXYs = assetFeature.geometry.coordinates
  const busCount = connections.length
  const busXYs = [
    assetXYs[0],
    assetXYs[assetXYs.length - 1],
  ]

  for (let i = 0; i < busCount; i++) {
    const connection = connections[i]
    const busId = connection.busId
    if (busIds.includes(busId)) continue

    busFeatures.push({
      type: 'Feature',
      properties: {id: busId},
      geometry: {
        type: 'Point',
        coordinates: busXYs[i],
      }
    })
    busIds.push(busId)
  }

  return busFeatures
}