import React from 'react'
import { useSelector } from 'react-redux'
import AttributeTextFields from './AttributeTextFields'
import {
  isNotNull,
} from '../macros'
import {
  getAssetTypeByCode,
} from '../selectors'

export default function BusAttributesListItem(props) {
  const {
    assetTypeCode,
    connection,
    isEditing,
  } = props
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const attributeValueByKey = connection.attributes || {}

  let attributeKeyTypes = assetType.connectionAttributes || []
  if (!isEditing) {
    attributeKeyTypes = attributeKeyTypes.filter(([
      attributeKey, attributeType,
    ]) => isNotNull(attributeValueByKey[attributeKey]))
  }

  return (
    <AttributeTextFields
      attributeKeyTypes={attributeKeyTypes}
      attributeValueByKey={attributeValueByKey}
      isEditing={isEditing}
    />
  )
}
