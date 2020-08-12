// TODO: Review from scratch

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import AssetName from './AssetName'
import AssetAttributesListItem from './AssetAttributesListItem'
import AssetConnectionsListItems from './AssetConnectionsListItems'
import AssetDeleteDialog from './AssetDeleteDialog'
import {
} from '../actions'
import {
  getIsViewing,
  getAssetTypeByCode,
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
  const isViewing = useSelector(getIsViewing)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
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
      <Divider style={{ marginTop: '10px' }} />
      <div style={{ flex: '0 0 auto' }}>
        <Button className={classes.bottomAction} onClick={() => setDeletedAssetId(asset.id)}>
          Delete asset
        </Button>
      </div>
      <AssetDeleteDialog
        deletedAssetId={deletedAssetId}
        isOpen={deletedAssetId !== null}
        onClose={() => setDeletedAssetId(null)}
      />

    </List>
  )
}
