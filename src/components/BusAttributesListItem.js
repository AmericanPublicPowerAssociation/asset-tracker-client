// TODO: Review from scratch

import React from 'react'
import { useSelector } from 'react-redux'
import AttributeFields from './AttributeFields'
import {
  isNotNull,
} from '../macros'
import {
  getAssetTypeByCode,
} from '../selectors'

export default function BusAttributesListItem(props) {
  const {
    assetId,
    assetTypeCode,
    connection,
    isEditing,
    onFocus,
    connectionIndex,
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
    <AttributeFields
      assetId={assetId}
      connectionIndex={connectionIndex}
      attributeKeyTypes={attributeKeyTypes}
      attributeValueByKey={attributeValueByKey}
      isEditing={isEditing}
      onFocus={onFocus}
    />
  )
}
