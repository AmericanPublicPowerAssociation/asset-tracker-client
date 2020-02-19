import React from 'react'
import TextField from '@material-ui/core/TextField'
import {
  getAttributeLabel,
} from '../routines'

export default function AttributeTextFields(props) {
  const {
    attributeKeyTypes,
    attributeValueByKey,
    isEditing,
  } = props
  return attributeKeyTypes.map(([
    attributeKey,
    attributeType,
  ]) => (
    <TextField
      fullWidth
      variant='filled'
      key={attributeKey}
      label={getAttributeLabel(attributeKey)}
      value={attributeValueByKey[attributeKey]}
      disabled={!isEditing}
    />
  ))
}
