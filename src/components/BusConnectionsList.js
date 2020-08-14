import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  setPopUpState,
  setSelection,
} from '../actions'
import {
  getAssetDescription,
  getRepresentativeXY,
} from '../routines'
import {
  getAssetById,
  getAssetsGeoJson,
  getAssetTypeByCode,
  getMapWebMercatorViewPort,
} from '../selectors'

export default function BusConnectionsList({ connectedAssetIds }) {
  const dispatch = useDispatch()
  const mapWebMercatorViewPort = useSelector(getMapWebMercatorViewPort)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const { features } = assetsGeoJson

  function showPopUp(assetId) {
    const feature = features.find(feature => feature.properties.id === assetId)
    const lonlat = getRepresentativeXY(feature)
    const [x, y] = mapWebMercatorViewPort.project(lonlat)
    const text = getAssetDescription(assetId, assetById, assetTypeByCode)
    dispatch(setPopUpState({ x, y, text }))
  }

  function selectAsset(assetId) {
    dispatch(setSelection({ assetId }))
  }

  return (
    <List component='div' disablePadding>
    {connectedAssetIds.map((connectedAssetId, connectedAssetIdIndex) => {
      const connectedAsset = assetById[connectedAssetId]
      const connectedAssetTypeCode = connectedAsset.typeCode
      const connectedAssetType = assetTypeByCode[connectedAssetTypeCode]
      const connectedAssetTypeName = connectedAssetType.name
      const connectedAssetName = connectedAsset.name
      return (
        <ListItem
          disableGutters
          component='div'
          key={connectedAssetIdIndex}
          onClick={() => showPopUp(connectedAssetId)}
          onDoubleClick={() => selectAsset(connectedAssetId)}
        >
          <Tooltip title={connectedAssetTypeName} placement='left'>
            <ListItemIcon>
              <AssetTypeSvgIcon assetTypeCode={connectedAssetTypeCode} />
            </ListItemIcon>
          </Tooltip>
          <ListItemText style={{ overflowWrap: 'anywhere' }}primary={connectedAssetName}/>
        </ListItem>
      )
    })}
    </List>
  )
}
