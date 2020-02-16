import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import AssetName from './AssetName'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import CollapsibleList from './CollapsibleList'
import {
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getAssetTypeByCode,
} from '../selectors'

/*
const useStyles = makeStyles(theme => ({
}))
*/

export default function AssetDetailsPanel(props) {
  const {
    asset,
    sketchMode,
  } = props
  // const classes = useStyles()
  // const dispatch = useDispatch()
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const [
    isAttributesListOpen,
    setIsAttributesListOpen,
  ] = useState(false)
  const [
    isConnectionsListOpen,
    setIsConnectionsListOpen,
  ] = useState(true)

  // const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const assetTypeAttributes = assetType.assetAttributes || {}

  /*
  let vendorName = ''
  let productName = ''
  let productVersion = ''
  if (asset['attributes']) {
    vendorName = asset.attributes['vendorName'] || ''
    productName = asset.attributes['productName'] || ''
    productVersion = asset.attributes['productVersion'] || ''
  }
  */

  const isEditing = sketchMode !== SKETCH_MODE_VIEW
  const attributeFields = getAttributeFields(
    assetTypeAttributes, asset, isEditing)

  return (
    <>
      <List component='div' disablePadding>
        <ListItem component='div' disableGutters>
          <Tooltip title={assetTypeName} placement='left'>
            <ListItemIcon>
              <AssetTypeSvgIcon assetTypeCode={assetTypeCode} />
            </ListItemIcon>
          </Tooltip>

          <ListItemText>
            <AssetName asset={asset} isEditing={isEditing} />
          </ListItemText>
        </ListItem>

        <CollapsibleList
          title='Attributes'
          isOpen={isAttributesListOpen}
          setIsOpen={setIsAttributesListOpen}
        >
          {attributeFields}
        </CollapsibleList>

        <CollapsibleList
          title='Connections'
          isOpen={isConnectionsListOpen}
          setIsOpen={setIsConnectionsListOpen}
        >
          Whee
        </CollapsibleList>
      </List>
    </>
  )
}

/*

import AssetConnectionList from './AssetConnectionList'
import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
import {
  setAssetAttribute,
} from '../actions'
  const disableInput = sketchMode === SKETCH_MODE_VIEW

  function trackChange(attribute, value) {
    dispatch(setAssetAttribute(assetId, attribute, value))
  }

      <VendorName
        disableTextInput={disableInput}
        typeId={assetTypeCode}
        vendorName={vendorName}
        trackChange={trackChange}
        saveChange={() => {}}
      />
      <ProductName
        disableTextInput={disableInput}
        type={assetTypeCode}
        vendorName={vendorName}
        productName={productName}
        trackChange={trackChange}
        saveChange={() => {}}
      />
      <ProductVersion
        disableTextInput={disableInput}
        typeId={assetTypeCode}
        vendorName={vendorName}
        productName={productName}
        productVersion={productVersion}
        trackChange={trackChange}
        saveChange={() => {}}
      />
      <AssetConnectionList
        asset={asset}
        disableInput={disableInput}
      />

 */

function getAttributeFields(assetTypeAttributes, asset, isEditing) {

  return assetTypeAttributes.map(([attributeKey, attributeType]) => {
    const attributeValue = asset.attributes[attributeKey]
    return (
      <TextField
        key={attributeKey}
        label={attributeKey}
        value={attributeValue}
        variant='filled'
        disabled={!isEditing}
      />
    )
  })
}
