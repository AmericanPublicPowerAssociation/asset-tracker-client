import React from 'react'
import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  getAssetById,
  getAssetIdsByBusId,
  getAssetTypeByCode,
} from '../selectors'

export default function BusConnectionsListItems(props) {
  const {
    assetId,
    busId,
  } = props
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const assetById = useSelector(getAssetById)
  const connectedAssetIds = assetIdsByBusId[busId].filter(
    connectedAssetId => connectedAssetId !== assetId)

  return connectedAssetIds.map(connectedAssetId => {
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
  })
}
