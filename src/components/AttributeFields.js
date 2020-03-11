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
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme =>  ({
  fullSelect:  {
    width: '100%'
  },
  fixLabelPosition: {
    'marginLeft': '10px',
    'textTransform': 'capitalize',
  }
}));

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
  const classes = useStyle()

  function trackChange(attributeKey, attributeValue) {
    dispatch(setAssetAttribute(assetId, attributeKey, attributeValue))
  }

  function handleOnFocus(e) {
    onFocus && onFocus(e)
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
  } else if (Array.isArray(attributeType)) {
    return  <FormControl className={classes.fullSelect}>
      <InputLabel shrink id={`${attributeKey}-${assetId}`} className={classes.fixLabelPosition}>
        {getAttributeLabel(attributeKey)}
      </InputLabel>
      <Select
        fullWidth
        variant='filled'
        key={attributeKey}
        labelId={`${attributeKey}-${assetId}`}
        label={getAttributeLabel(attributeKey)}
        value={attributeValueByKey[attributeKey]}
        disabled={!isEditing}
        onChange={e => trackChange(attributeKey, e.target.value)}
        inputProps={{ inputProps: { onFocus: handleOnFocus } }}
        onFocus={handleOnFocus}
      >
      {attributeType.map((option) => {
        return <MenuItem value={option}>{option}</MenuItem>
      })}
      </Select>
    </FormControl>
  } else {
    return <TextField
      fullWidth
      variant='filled'
      key={attributeKey}
      label={getAttributeLabel(attributeKey)}
      value={attributeValueByKey[attributeKey]}
      type={attributeType === 'number' ? 'number' : 'text'}
      disabled={!isEditing}
      InputLabelProps={{ classes: { root: 'capitalized' } }}
      InputProps={{ inputProps: { onFocus: handleOnFocus } }}
      onChange={e => trackChange(attributeKey, e.target.value)}
      onFocus={handleOnFocus}
    />
  }
}
