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
  const boundaryStrings = sizeByValue.keySeq().sortBy(_ => parseFloat(_))

  let value = asset.get(sizeAttribute)
  if (value === undefined) {
    const minimumSize = sizeByValue.get(boundaryStrings.get(0))
    return minimumSize
  }
  value = parseFloat(value)

  for (const boundaryString of boundaryStrings) {
    const boundaryValue = parseFloat(boundaryString)
    if (value < boundaryValue) {
      return sizeByValue.get(boundaryString)
    }
  }
  const maximumSize = sizeByValue.get(boundaryStrings.get(-1))
  return maximumSize
}


export function getFeatureKey(asset) {
  const typeId = asset.get('typeId')
  // !!! Add utilityId
  return typeId
}
