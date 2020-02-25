import React from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
import {
  setAssetAttribute,
} from '../actions'
import {
  getAttributeLabel,
} from '../routines'

export default function AttributeFields(props) {
  const {
    assetId,
    assetTypeCode,
    attributeKeyTypes,
    attributeValueByKey,
    isEditing,
    onFocus,
  } = props
  return attributeKeyTypes.map(([
    attributeKey,
    attributeType,
  ], attributeKeyTypeIndex) => (
    <AttributeField
      key={attributeKeyTypeIndex}
      assetId={assetId}
      assetTypeCode={assetTypeCode}
      attributeType={attributeType}
      attributeKey={attributeKey}
      attributeValueByKey={attributeValueByKey}
      isEditing={isEditing}
      onFocus={onFocus}
    />
  ))
}

function AttributeField(props) {
  const {
    assetId,
    assetTypeCode,
    attributeType,
    attributeKey,
    attributeValueByKey,
    isEditing,
    onFocus,
  } = props
  const dispatch = useDispatch()

  function trackChange(attributeKey, attributeValue) {
    dispatch(setAssetAttribute(assetId, attributeKey, attributeValue))
  }

  function handleOnFocus(e) {
    if (onFocus) onFocus(e)
  }

  if (attributeType === 'vendorName') {
    return <VendorName
      typeCode={assetTypeCode}
      vendorName={attributeValueByKey.vendorName || null}
      disabled={!isEditing}
      TextFieldProps={{ fullWidth: true, variant: 'filled' }}
      trackChange={trackChange}
    />
  } else if (attributeType === 'productName') {
    return <ProductName
      typeCode={assetTypeCode}
      vendorName={attributeValueByKey.vendorName || null}
      productName={attributeValueByKey.productName || null}
      disabled={!isEditing}
      TextFieldProps={{ fullWidth: true, variant: 'filled' }}
      trackChange={trackChange}
    />
  } else if (attributeType === 'productVersion') {
    return <ProductVersion
      typecode={assetTypeCode}
      vendorName={attributeValueByKey.vendorName || null}
      productName={attributeValueByKey.productName || null}
      productVersion={attributeValueByKey.productVersion || null}
      disabled={!isEditing}
      TextFieldProps={{ fullWidth: true, variant: 'filled' }}
      trackChange={trackChange}
    />
  } else {
    return <TextField
      fullWidth
      variant='filled'
      key={attributeKey}
      label={getAttributeLabel(attributeKey)}
      value={attributeValueByKey[attributeKey]}
      disabled={!isEditing}
      InputLabelProps={{ classes: { root: 'capitalized' } }}
      InputProps={{ inputProps: { onFocus: handleOnFocus } }}
      onChange={e => trackChange(attributeKey, e.target.value)}
      onFocus={handleOnFocus}
    />
  }
}
