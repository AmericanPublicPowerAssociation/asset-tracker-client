export function getAssetDescription(assetId, assetById, assetTypeByCode) {
  let asset = assetById[assetId]
  if (!asset) {
    return null
  }
  const assetType = assetTypeByCode[asset.typeCode]
  return assetType.name + ' ' + asset.name
}
