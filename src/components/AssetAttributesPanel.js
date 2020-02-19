import React from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import AssetName from './AssetName'
import AssetAttributesListItem from './AssetAttributesListItem'
import AssetConnectionsListItems from './AssetConnectionsListItems'
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

export default function AssetAttributesPanel(props) {
  const {
    asset,
    sketchMode,
  } = props
  // const classes = useStyles()
  // const dispatch = useDispatch()
  const assetTypeByCode = useSelector(getAssetTypeByCode)

  // const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name

  const isEditing = sketchMode !== SKETCH_MODE_VIEW

  return (
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

      <AssetAttributesListItem asset={asset} isEditing={isEditing} />

      <AssetConnectionsListItems asset={asset} isEditing={isEditing} />
    </List>
  )
}

/*
  let vendorName = ''
  let productName = ''
  let productVersion = ''
  if (asset['attributes']) {
    vendorName = asset.attributes['vendorName'] || ''
    productName = asset.attributes['productName'] || ''
    productVersion = asset.attributes['productVersion'] || ''
  }

import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
import {
  setAssetAttribute,
} from '../actions'

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
*/
