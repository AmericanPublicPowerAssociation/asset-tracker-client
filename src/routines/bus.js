import translateFeature from '@turf/transform-translate'
import {
  BUS_DISTANCE_IN_KILOMETERS_BY_CODE,
} from '../constants'

export function getBusFeatures(assetFeatures, assetById) {
  const busFeatures = []

  const busIds = []
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
    if (!asset) continue
    const connections = asset.connections
    if (!connections) continue
    busFeatures.push(...getBusFeaturesForGeometry(
      assetFeature, connections, busIds))
  }

  return busFeatures
}

function getBusFeaturesForPoint(assetFeature, connections, busIds) {
  const busFeatures = []
  const busCount = Object.keys(connections).length
  const busAngleIncrement = 360 / busCount
  const assetTypeCode = assetFeature.properties.typeCode
  const busDistanceInKilometers = BUS_DISTANCE_IN_KILOMETERS_BY_CODE[
    assetTypeCode]
  let busAngle = 0

  for (const [index, connection] of Object.entries(connections)) {
    const busId = connection.busId
    if (busIds.includes(busId)) continue

    const busGeometry = translateFeature(
      assetFeature,
      busDistanceInKilometers,
      busAngle,
    ).geometry
    busFeatures.push({
      type: 'Feature',
      properties: { id: busId, index },
      geometry: busGeometry,
    })
    busIds.push(busId)
    busAngle += busAngleIncrement
  }

  return busFeatures
}

function getBusFeaturesForLine(assetFeature, connections, busIds) {
  const busFeatures = []
  const assetXYs = assetFeature.geometry.coordinates

  for (const [index, connection] of Object.entries(connections)) {
    const busId = connection.busId
    if (busIds.includes(busId)) continue

    busFeatures.push({
      type: 'Feature',
      properties: { id: busId, index },
      geometry: { type: 'Point', coordinates: assetXYs[index] },
    })
    busIds.push(busId)
  }

  return busFeatures
}
