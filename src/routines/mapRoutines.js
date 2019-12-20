export function getBusFeatures(assetFeatures, assetById) {
  const busIds = []
  const busFeatures = []

  for (let i = 0; i < assetFeatures.length; i++) {
    const assetFeature = assetFeatures[i]
    const assetGeometry = assetFeature.geometry
    const assetGeometryType = assetGeometry.type
    const assetGeometryCoordinates = assetGeometry.coordinates
    const assetId = assetFeature.properties.id
    const asset = assetById[assetId]
    console.log(assetId)
  }

  return busFeatures
}
