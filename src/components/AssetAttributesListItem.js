import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CollapsibleListItem from './CollapsibleListItem'
import {
  getAssetTypeByCode,
} from '../selectors'

export default function AssetAttributesListItem(props) {
  const {
    asset,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const assetTypeByCode = useSelector(getAssetTypeByCode)

  const assetTypeCode = asset.typeCode
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name

  return (
    <CollapsibleListItem
      title={assetTypeName}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      Asset Attributes
    </CollapsibleListItem>
  )
}

/*
export default function AssetAttributesList(props) {
  const {
    isEditing,
  } = props

  let assetTypeAttributes = assetType.assetAttributes || []
  if (!isEditing) {
    assetTypeAttributes = assetTypeAttributes.filter(([attributeKey, attributeType]))
  }

  const assetAttributePacks = assetTypeAttributes.map(([
    attributeKey, attributeType,
  ]) => {
  })

  return (

    <CollapsibleList
      title={assetTypeName}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {attributeFields}
    </CollapsibleList>

  )
}
*/
