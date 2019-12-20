import {
  LINE_ASSET_TYPE_ID,
} from '../constants'

export function getBusFeatures(assetFeatures, assetById) {
  const busIds = []
  const busFeatures = []

  for (let i = 0; i < assetFeatures.length; i++) {
    const assetFeature = assetFeatures[i]
    const assetGeometry = assetFeature.geometry
    const assetXYs = assetGeometry.coordinates
    const assetId = assetFeature.properties.id
    const asset = assetById[assetId]
    const assetTypeId = asset.typeId
    const busByIndex = asset.busByIndex || {}
    const busEntries = Object.entries(busByIndex)
    const busCount = busEntries.length

    switch(assetTypeId) {
      case LINE_ASSET_TYPE_ID: {
        const busXYs = [
          assetXYs[0],
          assetXYs[assetXYs.length - 1],
        ]
        for (let j = 0; j < busCount; j++) {
          const [busIndex, bus] = busEntries[j]
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
          console.log(busXYs[busIndex])
        }
        break
      }
      default: {
      }
    }
  }

  return busFeatures
}
