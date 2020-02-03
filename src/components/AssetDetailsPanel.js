
import React, { useState } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
/*
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Divider from '@material-ui/core/Divider'
import StarBorder from '@material-ui/icons/StarBorder'
*/
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import AssetConnectionList from './AssetConnectionList'
import {
  ASSET_TYPE_BY_CODE,
  SKETCH_MODE_VIEW,
} from '../constants'
/*
import {
  LINE_ASSET_TYPE_ID,
  TRANSFORMER_ASSET_TYPE_ID,
  SUBSTATION_ASSET_TYPE_ID,
  METER_ASSET_TYPE_ID,
} from '../constants'
import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
*/
import {
  getFocusingAsset,
} from '../selectors'
import {
  // mergeAsset,
  // changeAsset,
} from '../actions'


export default function AssetDetailsPanel(props) {
  const {
    asset,
    sketchMode,
  } = props
  const [
    isWithExpandedDetails, setIsWithExpandedDetails,
  ] = useState(true)
  const [
    isWithExpandedConnections, setIsWithExpandedConnections,
  ] = useState(false)
  const assetName = asset.name
  const assetTypeCode = asset.typeCode
  const assetType = ASSET_TYPE_BY_CODE[assetTypeCode]
  const assetTypeName = assetType.name
  const assetNameComponent = sketchMode === SKETCH_MODE_VIEW ?
    <ListItemText
      primary={assetName}
      secondary={`Id: ${asset.id}`} /> :
    <TextField value={assetName} variant='outlined' />
  const dispatch = useDispatch()

  function trackChanges(attributes) {
    //    dispatch(mergeAsset({id, ...attributes}))
  }

  function getConnections() {

  }

  const arrowComponent = (
    isWithExpandedDetails ?
    <ExpandLess /> :
    <ExpandMore />
  )

  return (
    <List
      component="div"
      disablePadding
    >
      <ListItem
        component="div"
        onClick={ () => setIsWithExpandedDetails(!isWithExpandedDetails)}
        disableGutters
      >
        <Tooltip title={assetTypeName} placement='left'>
          <ListItemAvatar>
            <Avatar>
              <AssetTypeSvgIcon
                assetTypeCode={assetTypeCode}
              />
            </Avatar>
          </ListItemAvatar>
        </Tooltip>
        {assetNameComponent}
        {arrowComponent}
      </ListItem>
      <Collapse
        in={isWithExpandedDetails}
        // timeout='auto'
      >
        <AssetConnectionList asset={asset}/>
      </Collapse>
    </List>
  )
}
/*
      <VendorName
        typeId={typeId}
        vendorName={vendorName}
        trackChanges={_trackChanges}
      // saveChanges={_saveChanges}
      />
      <ProductName
        className={clsx({
          
        })}
        type={typeId}
        vendorName={vendorName}
        productName={productName}
        trackChanges={_trackChanges}
      // saveChanges={_saveChanges}
      />
      <ProductVersion
        typeId={typeId}
        vendorName={vendorName}
        productName={productName}
        productVersion={productVersion}
        trackChanges={_trackChanges}
      // saveChanges={_saveChanges}
      />
    </>
*/
