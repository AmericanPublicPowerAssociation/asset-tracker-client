// TODO: Review from scratch

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import {
  getAuthUtilities,
} from 'appa-auth-consumer'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import AssetName from './AssetName'
import AssetAttributesListItem from './AssetAttributesListItem'
import AssetConnectionsListItems from './AssetConnectionsListItems'
import AssetDeleteDialog from './AssetDeleteDialog'
import {
  setAssetValue,
} from '../actions'
import {
  SKETCH_MODE_ADD,
  SKETCH_MODE_EDIT, 
} from '../constants'
import {
  getIsViewing,
  getAssetTypeByCode,
  getSketchMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  bottomAction: {
    color: '#d22d2a',
    width: '100%',
    bottom: 0,
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  sidePadding: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
}))

export default function AssetAttributesPanel({
  asset,
  setIsDetailsWindowExpanded,
  isDetailsWindowExpanded,
}) {
  const dispatch = useDispatch()

  const isViewing = useSelector(getIsViewing)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const utilities = useSelector(getAuthUtilities)
  const sketchMode = useSelector(getSketchMode)

  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const isEditing = !isViewing

  const classes = useStyles()
  const [deletedAssetId, setDeletedAssetId] = useState(null)

  return (
    <List component='div' disablePadding>
      <ListItem component='div' disableGutters style={{ flex: '0 0 auto', padding: '10px' }}>
        <Tooltip title={assetTypeName} placement='left'>
          <ListItemIcon>
            <AssetTypeSvgIcon assetTypeCode={assetTypeCode} />
          </ListItemIcon>
        </Tooltip>

        <ListItemText>
          <AssetName
            asset={asset}
            isEditing={isEditing}
            isFullScreen={isDetailsWindowExpanded}
            setIsFullScreen={setIsDetailsWindowExpanded}
          />
        </ListItemText>
      </ListItem>

      <AssetAttributesListItem
        asset={asset}
        isEditing={isEditing}
        styling={classes.sidePadding}
      />

      <AssetConnectionsListItems
        asset={asset}
        isEditing={isEditing}
        expand={isDetailsWindowExpanded}
        styling={classes.sidePadding}
      />

      <FormControl variant='filled' fullWidth>
        <InputLabel id='utilityName'>
          Utility Name
        </InputLabel>
        <Select
          fullWidth
          variant='filled'
          labelId='utilityName'
          label='Utility Name'
          value={asset.utilityId || ''}
          disabled={!isEditing}
          onChange={e => {
            dispatch(setAssetValue(assetId, 'utilityId', e.target.value))
          }}
        >
          {utilities.map((utility, index) => (
            <MenuItem
              key={index}
              value={utility.id}
            >
              {utility.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <Divider style={{ marginTop: '10px' }} /> */}
      {
        (sketchMode.includes(SKETCH_MODE_EDIT) || sketchMode.includes(SKETCH_MODE_ADD)) &&
        <div style={{ flex: '0 0 auto' }}>
          <Button
            className={classes.bottomAction}
            onClick={() => setDeletedAssetId(asset.id)}
          >
            Delete asset
          </Button>
        </div>
      }
      <AssetDeleteDialog
        deletedAssetId={deletedAssetId}
        isOpen={deletedAssetId !== null}
        onClose={() => setDeletedAssetId(null)}
      />
    </List>
  )
}
