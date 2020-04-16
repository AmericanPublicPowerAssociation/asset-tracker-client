import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import produce from 'immer'
import CollapsibleListItem from './CollapsibleListItem'
import BusAttributesListItem from './BusAttributesListItem'
import BusConnectionsList from './BusConnectionsList'
import {
  setFocusingBusId,
} from '../actions'
import {
  getCountDescription,
  getLetter,
} from '../macros'
import {
  getAssetIdsByBusId,
  getBusesGeoJson,
  getFocusingBusId,
} from '../selectors'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

export default function AssetConnectionsListItems(props) {
  const dispatch = useDispatch()
  const theme = useTheme();

  const {
    asset,
    isEditing,
    setSelectedBusIndexes,
    setSelectedAssetIndexes,
    noHighlight,
    expand
  } = props
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [isOpenByConnectionIndex, setIsOpenByConnectionIndex] = useState({})
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const connections = asset.connections || []
  const busesGeoJson = useSelector(getBusesGeoJson)
  const focusingBusId = useSelector(getFocusingBusId)

  return connections.map((connection, connectionIndex) => {
    const busId = connection.busId
    const connectedAssetIds = assetIdsByBusId[busId].filter(
      connectedAssetId => connectedAssetId !== assetId)

    const connectedAssetCount = connectedAssetIds.length
    const title = `Bus ${getLetter(connectionIndex)}`
    const description = getCountDescription(connectedAssetCount, 'connection')
    const isOpen = isOpenByConnectionIndex[connectionIndex]

    function setIsOpen(value) {
      const state = isOpenByConnectionIndex
      const nextState = produce(state, draft => {
        draft[connectionIndex] = value
      })
      setIsOpenByConnectionIndex(nextState)
    }

    function onClickOrFocus() {
      const features = busesGeoJson.features
      const index = features.findIndex( feature => feature.properties.id === busId)
      if (index > -1) {
        setSelectedBusIndexes([index])
        dispatch(setFocusingBusId(busId))
      }
      else
        setSelectedBusIndexes([])
    }

    return connectedAssetCount > 0 ?
      <CollapsibleListItem
        key={connectionIndex}
        title={title}
        description={matches || expand ? description : null}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={onClickOrFocus}
        highlight={ !noHighlight && focusingBusId === busId }
      >
        <BusAttributesListItem
          assetId={assetId}
          assetTypeCode={assetTypeCode}
          connection={connection}
          isEditing={isEditing}
          onFocus={onClickOrFocus}
        />
        <BusConnectionsList
          connectedAssetIds={connectedAssetIds}
          setSelectedAssetIndexes={setSelectedAssetIndexes}
        />
      </CollapsibleListItem> :
      ( matches || expand ?
      <ListItem
        disableGutters
        component='div'
        key={connectionIndex}
      >
        <ListItemText primary={title} secondary={description} />
      </ListItem> : <></>)
  })
}
