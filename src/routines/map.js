import translateFeature from '@turf/transform-translate'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ViewMode,
} from 'nebula.gl'
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
  const busIds = []
  const busFeatures = []

  for (let i = 0; i < assetFeatures.length; i++) {
    let newFeatures = []
    const assetFeature = assetFeatures[i]
    const assetGeometry = assetFeature.geometry
    const assetGeometryType = assetGeometry.type
    const assetXYs = assetGeometry.coordinates
    const assetId = assetFeature.properties.id
    const asset = assetById[assetId]
    const busByIndex = asset.busByIndex
    if (!busByIndex) {
      continue
    }
    switch(assetGeometryType) {
      case 'Point': {
        newFeatures = getBusFeaturesForPoint(assetFeature, busByIndex, busIds)
        break
      }
      case 'LineString': {
        newFeatures = getBusFeaturesForLine(assetXYs, busByIndex, busIds)
        break
      }
      default: {
      }
    }
    busFeatures.push(...newFeatures)
  }

  return busFeatures
}

function getBusFeaturesForPoint(assetFeature, busByIndex, busIds) {
  const busFeatures = []
  const buses = Object.values(busByIndex)
  const busCount = buses.length
  const busAngleIncrement = 360 / busCount

  for (let i = 0; i < busCount; i++) {
    const bus = buses[i]
    const busId = bus.id
    if (busIds.includes(busId)) {
      continue
    }
    const busAngle = busAngleIncrement * i
    const busGeometry = translateFeature(
      assetFeature, BUS_DISTANCE_IN_KILOMETERS, busAngle).geometry
    busFeatures.push({
      type: 'Feature',
      properties: {id: busId},
      geometry: busGeometry,
    })
    busIds.push(busId)
  }

  return busFeatures
}

function getBusFeaturesForLine(assetXYs, busByIndex, busIds) {
  const busFeatures = []
  const busEntries = Object.entries(busByIndex)
  const busCount = busEntries.length
  const busXYs = [
    assetXYs[0],
    assetXYs[assetXYs.length - 1],
  ]
  for (let i = 0; i < busCount; i++) {
    const [busIndex, bus] = busEntries[i]
    const busId = bus.id
    if (busIds.includes(busId)) {
      continue
    }
    busFeatures.push({
      type: 'Feature',
      properties: {id: busId},
      geometry: {
        type: 'Point',
        coordinates: busXYs[busIndex],
      }
    })
    busIds.push(busId)
  }
  return busFeatures
}
