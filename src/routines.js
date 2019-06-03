import { findDOMNode }  from 'react-dom'
import { Map } from 'immutable'


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
    findDOMNode(ref).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}


export function getFeatureSize(asset, assetTypeById) {
  const typeId = asset.get('typeId')
  const assetType = assetTypeById.get(typeId)
  const sizeAttribute = assetType.get('sizeAttribute')
  const value = asset.get(sizeAttribute)
  if (value === undefined) {
    return assetType.get('minimumSize', 1)
  }
  const sizeByValue = assetType.get('sizeByValue', Map())
  const boundaryValues = sizeByValue.keySeq().sort()
  for (const boundaryValue of boundaryValues) {
    if (value < boundaryValue) {
      return sizeByValue.get(boundaryValue)
    }
  }
  return assetType.get('minimumSize', 30)
}


export function getFeatureKey(asset) {
  const typeId = asset.get('typeId')
  // !!! Add utilityId
  return typeId[0]
}
