import { findDOMNode }  from 'react-dom'
import { Map } from 'immutable'


export function getAssetTypeName(assetTypeId, assetTypeById) {
  const primaryAssetTypeId = assetTypeId[0]
  const primaryAssetType = assetTypeById.get(primaryAssetTypeId)
  if (!primaryAssetType) {
    return '?'
  }
  const primaryAssetTypeName = primaryAssetType.get('name')
  const assetTypeNameParts = [primaryAssetTypeName]
  const secondaryAssetTypeId = assetTypeId[1]
  if (secondaryAssetTypeId) {
    const nameById = primaryAssetType.get('nameById')
    const name = nameById.get(secondaryAssetTypeId)
    if (name) {
      assetTypeNameParts.push(name)
    }
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

export function rinseTask(task) {
  return task.deleteAll([
    'isOpen',
    'errors',
    // 'connectedIds',
    // 'parentIds',
    // 'childIds',
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

  const primaryAssetType = assetTypeById.get(typeId[0])
  const size = primaryAssetType.get('featureSize')
  if (size) {
    return size
  }

  const sizeAttribute = primaryAssetType.get('featureSizeAttribute')
  const sizeByValue = primaryAssetType.get('featureSizeByValue', Map())
  const boundaryValues = sizeByValue.keySeq().sort()

  const value = asset.get(sizeAttribute)
  if (value === undefined) {
    const minimumSize = sizeByValue.get(boundaryValues.get(0))
    return minimumSize
  }
  for (const boundaryValue of boundaryValues) {
    if (value < boundaryValue) {
      return sizeByValue.get(boundaryValue)
    }
  }
  const maximumSize = sizeByValue.get(boundaryValues.get(-1))
  return maximumSize
}


export function getFeatureKey(asset) {
  const typeId = asset.get('typeId')
  // !!! Add utilityId
  return typeId
}
