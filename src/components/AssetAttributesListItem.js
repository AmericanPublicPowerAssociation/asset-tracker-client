import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CollapsibleListItem from './CollapsibleListItem'
import AttributeTextFields from './AttributeTextFields'
import {
  isNotNull,
} from '../macros'
import {
  getAssetTypeByCode,
} from '../selectors'

export default function AssetAttributesListItem(props) {
  const {
    asset,
    isEditing,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetTypeCode = asset.typeCode
  const attributeValueByKey = asset.attributes || {}
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name

  let attributeKeyTypes = assetType.assetAttributes || []
  if (!isEditing) {
    attributeKeyTypes = attributeKeyTypes.filter(([
      attributeKey, attributeType,
    ]) => isNotNull(attributeValueByKey[attributeKey]))
  }

  return (attributeKeyTypes.length > 0 ?
    <CollapsibleListItem
      title={assetTypeName}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <AttributeTextFields
        attributeKeyTypes={attributeKeyTypes}
        attributeValueByKey={attributeValueByKey}
        isEditing={isEditing}
      />
    </CollapsibleListItem> :
    <ListItem disableGutters component='div'>
      <ListItemText primary={assetTypeName} />
    </ListItem>
  )
}
