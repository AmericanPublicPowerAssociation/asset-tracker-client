import React from 'react'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  getAssetById,
  getAssetTypeByCode,
} from '../selectors'

export default function BusConnectionsList(props) {
  const {
    connectedAssetIds,
  } = props
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)
  return (
    <List component='div' disablePadding>
    {connectedAssetIds.map(connectedAssetId => {
      const connectedAsset = assetById[connectedAssetId]
      const connectedAssetTypeCode = connectedAsset.typeCode
      const connectedAssetType = assetTypeByCode[connectedAssetTypeCode]
      const connectedAssetTypeName = connectedAssetType.name
      const connectedAssetName = connectedAsset.name
      return (
        <ListItem component='div' disableGutters>
          <Tooltip title={connectedAssetTypeName} placement='left'>
            <ListItemIcon>
              <AssetTypeSvgIcon assetTypeCode={connectedAssetTypeCode} />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary={connectedAssetName} />
        </ListItem>
      )
    })}
    </List>
  )
}
