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
  setAssetAttribute,
  // mergeAsset,
  // changeAsset,
} from '../actions'


export default function AssetDetailsPanel(props) {
  const dispatch = useDispatch()
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
  const disableInput = sketchMode === SKETCH_MODE_VIEW

  const handleTextFieldChange = (e, key) => {
    const val = e.target.value
    dispatch(setAssetAttribute(assetId, key, val))
  }

  const assetNameComponent = (disableInput ?
    <Tooltip title={assetName} placement="bottom">
      <ListItemText
        primary={
          <Typography variant="h5" noWrap={true}>
            {assetName}
          </Typography>
        }
      />
    </Tooltip> :
    <TextField
      onChange={(e) =>handleTextFieldChange(e, 'name')}
      value={assetName}
      variant='outlined'
    />
  )
  /*
  function trackChanges(attributes) {
    dispatch(mergeAsset({assetId, ...attributes}))
  }
  */

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
        disableGutters
        component="div"
        onClick={
          () => setIsWithExpandedDetails(!isWithExpandedDetails)
        }
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
        <AssetConnectionList asset={asset} disableInput={disableInput} />
      </Collapse>
    </List>
  )
}
