import React from 'react'
import { useDispatch } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import AssetName from './AssetName'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import AssetConnectionList from './AssetConnectionList'
import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
import {
  setAssetAttribute,
} from '../actions'
import {
  ASSET_TYPE_BY_CODE,
  SKETCH_MODE_VIEW,
} from '../constants'

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
  const dispatch = useDispatch()

  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetType = ASSET_TYPE_BY_CODE[assetTypeCode]
  const assetTypeName = assetType.name

  let vendorName = ''
  let productName = ''
  let productVersion = ''
  if (asset['attributes']) {
    vendorName = asset.attributes['vendorName'] || ''
    productName = asset.attributes['productName'] || ''
    productVersion = asset.attributes['productVersion'] || ''
  }

  const isEditing = sketchMode !== SKETCH_MODE_VIEW
  const disableInput = sketchMode === SKETCH_MODE_VIEW

  function trackChange(attribute, value) {
    dispatch(setAssetAttribute(assetId, attribute, value))
  }

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
      </List>

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
    </>
  )
}
