import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import CollapsibleListItem from './CollapsibleListItem'
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

  let assetTypeAttributes = assetType.assetAttributes || []
  if (!isEditing) {
    assetTypeAttributes = assetTypeAttributes.filter(([
      attributeKey, attributeType,
    ]) => isNotNull(attributeValueByKey[attributeKey]))
  }

  return (assetTypeAttributes.length > 0 ?
    <CollapsibleListItem
      title={assetTypeName}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
    {assetTypeAttributes.map(([attributeKey, attributeType]) => (
      <TextField
        fullWidth
        variant='filled'
        key={attributeKey}
        label={attributeKey}
        value={attributeValueByKey[attributeKey]}
        disabled={!isEditing}
      />
    ))}
    </CollapsibleListItem> :
    <ListItem disableGutters component='div'>
      <ListItemText primary={assetTypeName} />
    </ListItem>
  )
}
