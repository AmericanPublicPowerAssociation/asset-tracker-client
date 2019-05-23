import { ASSET_TYPE_BY_ID } from './constants'


export function getAssetTypeName(assetTypeId) {
  const primaryAssetTypeId = assetTypeId[0]
  const primaryAssetType = ASSET_TYPE_BY_ID[primaryAssetTypeId]
  const assetTypeNameParts = [primaryAssetType.name]
  const secondaryAssetTypeId = assetTypeId[1]
  if (secondaryAssetTypeId) {
    const secondaryAssetTypeById = primaryAssetType.typeById
    const secondaryAssetType = secondaryAssetTypeById[secondaryAssetTypeId]
    assetTypeNameParts.push(secondaryAssetType.name)
  }
  return assetTypeNameParts.join(' > ')
}


export function rinseAsset(asset) {
  return asset.deleteAll(['isOpen', 'errors'])
}
