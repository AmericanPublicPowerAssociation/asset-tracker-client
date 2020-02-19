import React from 'react'
import TextField from '@material-ui/core/TextField'

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
      label={attributeKey}
      value={attributeValueByKey[attributeKey]}
      disabled={!isEditing}
    />
  ))
}
