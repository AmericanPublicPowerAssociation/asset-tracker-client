// TODO: Review from scratch

import React from 'react'
import { useSelector } from 'react-redux'
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
} from '../actions'
import {
  getIsViewing,
  getAssetTypeByCode,
} from '../selectors'

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

  return (
    <List component='div' disablePadding>
      <ListItem component='div' disableGutters>
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
      />
      <AssetConnectionsListItems
        asset={asset}
        isEditing={isEditing}
        expand={isDetailsWindowExpanded}
      />
    </List>
  )
}
