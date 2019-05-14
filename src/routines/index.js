import { ASSET_TYPE_BY_ID } from '../constants'


export const getAssetTypeName = asset => {
  const assetTypeId = asset.get('typeId')
  const primaryTypeId = assetTypeId[0]
  const primaryType = ASSET_TYPE_BY_ID[primaryTypeId]
  const assetTypeNameParts = [primaryType.name]
  const secondaryTypeId = assetTypeId[1]
  if (secondaryTypeId) {
    const secondaryTypeById = primaryType.typeById
    const secondaryType = secondaryTypeById[secondaryTypeId]
    assetTypeNameParts.push(secondaryType.name)
  }
  return assetTypeNameParts.join(' > ')
}
