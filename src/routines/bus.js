import translateFeature from '@turf/transform-translate'
import {
  ASSET_TYPE_CODE_LINE,
  BUS_DISTANCE_IN_KILOMETERS_BY_CODE,
  MINIMUM_BUS_ID_LENGTH,
} from '../constants'
import {
  getRandomId,
} from '../macros'

export function makeBusId() {
  return getRandomId(MINIMUM_BUS_ID_LENGTH)
}

export function getBusFeatures(assetFeatures, assetById) {
  const busFeatures = []
  const busIds = []
  const sortedAssetFeatures = [...assetFeatures].sort(
    f => f.typeCode !== ASSET_TYPE_CODE_LINE)
  for (let i = 0; i < sortedAssetFeatures.length; i++) {
    const assetFeature = sortedAssetFeatures[i]
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

export function getVertexIndex(busId, asset) {
  const connections = asset.connections
  const connectionPack = Object.entries(connections).find(([
    vertexIndex, connection,
  ]) => connection.busId === busId)
  const vertexIndex = parseInt(connectionPack[0])
  return vertexIndex
}
