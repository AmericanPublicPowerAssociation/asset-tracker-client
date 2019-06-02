import { findDOMNode }  from 'react-dom'


export function getAssetTypeName(assetTypeId, assetTypeById) {
  const primaryAssetTypeId = assetTypeId[0]
  const primaryAssetType = assetTypeById.get(primaryAssetTypeId)
  if (!primaryAssetType) {
    return '?'
  }
  const assetTypeNameParts = [primaryAssetType.get('name')]
  const secondaryAssetTypeId = assetTypeId[1]
  if (secondaryAssetTypeId) {
    const secondaryAssetTypeById = primaryAssetType.get('typeById')
    const secondaryAssetType = secondaryAssetTypeById[secondaryAssetTypeId]
    assetTypeNameParts.push(secondaryAssetType.name)
  }
  return assetTypeNameParts.join(' > ')
}


export function rinseAsset(asset) {
  return asset.deleteAll([
    'isOpen',
    'errors',
    'connectedIds',
    'parentIds',
    'childIds',
  ])
}


export function scrollToFocusingAsset(component) {
  const { focusingAssetId } = component.props
  const ref = component.refs[focusingAssetId]
  if (ref) {
    findDOMNode(ref).scrollIntoView({behavior: 'smooth', block: 'center'})
  }
}
