import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  setFocusingAssetId,
} from '../actions'
import {
  getAssetById,
  getAssetsGeoJson,
  getAssetTypeByCode,
} from '../selectors'

export default function BusConnectionsList(props) {
  const {
    connectedAssetIds,
    setSelectedAssetIndexes,
  } = props
  const dispatch = useDispatch()
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)
  const assetsGeoJson = useSelector(getAssetsGeoJson)

  function onClickFocusOnAsset(assetId, e) {
    dispatch(setFocusingAssetId(assetId))
  }

  function onClickHighlight(assetId, e) {
    const features = assetsGeoJson.features
    const index = features.findIndex( feature => feature.properties.id === assetId)
    index > -1 && setSelectedAssetIndexes([index])
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
        <ListItem disableGutters component='div' key={connectedAssetIdIndex}>
          <Tooltip title={connectedAssetTypeName} placement='left'>
            <ListItemIcon
              onClick={(e) => onClickFocusOnAsset(connectedAssetId, e)}
            >
              <AssetTypeSvgIcon assetTypeCode={connectedAssetTypeCode} />
            </ListItemIcon>
          </Tooltip>
          <ListItemText
            primary={connectedAssetName}
            onClick={(e) => onClickHighlight(connectedAssetId, e)}
          />
        </ListItem>
      )
    })}
    </List>
  )
}
