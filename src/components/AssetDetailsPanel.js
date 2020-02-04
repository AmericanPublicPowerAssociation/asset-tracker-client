import React, { useState } from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'
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
  mergeAsset,
  changeAsset,
} from '../actions'


export default function AssetDetailsPanel(props) {
  const {
    asset,
    sketchMode,
  } = props
  const [
    isWithExpandedDetails, setIsWithExpandedDetails,
  ] = useState(true)
  const assetName = asset.name
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetType = ASSET_TYPE_BY_CODE[assetTypeCode]
  const assetTypeName = assetType.name
  const assetNameComponent = sketchMode === SKETCH_MODE_VIEW ?
    <ListItemText
      primary={
        <InputBase
          defaultValue={assetName}
          onClick={ (e) => e.stopPropagation()} />
      }
      secondary={`Id: ${assetId}`} /> :
    <TextField value={assetName} variant='outlined' />
  const dispatch = useDispatch()

  function trackChanges(attributes) {
    dispatch(mergeAsset({assetId, ...attributes}))
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
          <ListItemIcon>
            <AssetTypeSvgIcon
              assetTypeCode={assetTypeCode}
            />
          </ListItemIcon>
        </Tooltip>
        {assetNameComponent}
        {arrowComponent}
      </ListItem>
      {
        /*
      <VendorName
        typeId={assetTypeCode}
        vendorName={""}
        trackChanges={trackChanges}
      // saveChanges={_saveChanges}
      />
      <ProductName
        className={clsx({
          
        })}
        type={assetTypeCode}
        vendorName={""}
        productName={""}
        trackChanges={trackChanges}
      // saveChanges={_saveChanges}
      />
      <ProductVersion
        typeId={assetTypeCode}
        vendorName={""}
        productName={""}
        productVersion={""}
        trackChanges={trackChanges}
      // saveChanges={_saveChanges}
      />
          */
      }
      <Collapse
        in={isWithExpandedDetails}
        // timeout='auto'
      >
        <AssetConnectionList asset={asset}/>
      </Collapse>
    </List>
  )
}
