import translateFeature from '@turf/transform-translate'
import {
  getConnectedAssetIds,
} from './asset'
import {
  ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_POLE,
  ASSET_TYPE_CODE_STATION,
  ASSET_TYPE_CODE_SUBSTATION,
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
  const sortedAssetFeatures = [...assetFeatures].sort((f1, f2) => {
    const assetTypeCode1 = f1.properties.typeCode
    const assetTypeCode2 = f2.properties.typeCode
    if (assetTypeCode1 === assetTypeCode2) return 0
    if (assetTypeCode1 === ASSET_TYPE_CODE_LINE) {
      // Put line assets last
      return 1
    }
    return -1
  })
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

export function isBusRequired(assetFeature, vertexIndex) {
  const assetTypeCode = assetFeature.properties.typeCode

  if ([
    ASSET_TYPE_CODE_POLE,
    ASSET_TYPE_CODE_SUBSTATION,
    ASSET_TYPE_CODE_STATION,
  ].includes(assetTypeCode)) {
    return false
  } else if (assetTypeCode === ASSET_TYPE_CODE_LINE) {
    const vertexCount = assetFeature.geometry.coordinates.length
    const lastVertexIndex = vertexCount - 1
    if (vertexIndex > 0 && vertexIndex < lastVertexIndex) {
      return false
    }
  }

  return true
}

export function getBusOrphanInfo(
  busId,
  assetId,
  assetById,
  assetIdsByBusId,
  assetFeatures,
) {
  const connectedAssetIds = getConnectedAssetIds(
    assetId, busId, assetIdsByBusId)
  const connectedAssetCount = connectedAssetIds.length
  if (connectedAssetCount !== 1) {
    // Skip if the bus has multiple connections
    return
  }

  const connectedAssetId = connectedAssetIds[0]
  const connectedAsset = assetById[connectedAssetId]
  const connectedAssetTypeCode = connectedAsset.typeCode
  if (connectedAssetTypeCode !== ASSET_TYPE_CODE_LINE) {
    // Skip if the bus is not on a line
    return
  }

  const connectedAssetFeature = assetFeatures.find(
    f => f.properties.id === connectedAssetId)
  const connectedAssetXYs = connectedAssetFeature.geometry.coordinates
  const connectedAssetVertexCount = connectedAssetXYs.length
  const connectedAssetLastVertexIndex = connectedAssetVertexCount - 1
  const vertexIndex = getVertexIndex(busId, connectedAsset)
  if (!vertexIndex || vertexIndex === connectedAssetLastVertexIndex) {
    // Skip if the bus is a line endpoint
    return
  }

  // Return line midpoint orphan bus info
  return [connectedAssetId, vertexIndex]
}
