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
} from '../macros'
import {
  getConnectedAssetIds,
} from '../routines'
import {
  getAssetIdsByBusId,
  getBusesGeoJson,
  getFocusingBusId,
} from '../selectors'

export default function AssetConnectionsListItems({
  asset,
  isEditing,
  setSelectedBusIndexes,
  setSelectedAssetIndexes,
  noHighlight,
}) {
  const dispatch = useDispatch()
  const [isOpenByIndex, setIsOpenByIndex] = useState({})
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const connections = asset.connections || {}
  const busesGeoJson = useSelector(getBusesGeoJson)
  const focusingBusId = useSelector(getFocusingBusId)

  return Object.entries(connections).map(([index, connection]) => {
    const { busId } = connection
    const connectedAssetIds = getConnectedAssetIds(
      assetId, busId, assetIdsByBusId)
    const connectedAssetCount = connectedAssetIds.length
    const title = 'Bus ' + index
    const description = getCountDescription(connectedAssetCount, 'connection')
    const isOpen = isOpenByIndex[index]

    function setIsOpen(value) {
      setIsOpenByIndex(produce(isOpenByIndex, draft => {
        draft[index] = value
      }))
    }

    function handleClickOrFocus() {
      const featureIndex = busesGeoJson.features.findIndex(
        feature => feature.properties.id === busId)
      if (featureIndex > -1) {
        setSelectedBusIndexes([featureIndex])
        dispatch(setFocusingBusId(busId))
      } else {
        setSelectedBusIndexes([])
      }
    }

    return connectedAssetCount > 0 ?
      <CollapsibleListItem
        key={index}
        title={title}
        description={description}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleClickOrFocus}
        highlight={ !noHighlight && focusingBusId === busId }
      >
        <BusAttributesListItem
          assetId={assetId}
          assetTypeCode={assetTypeCode}
          connection={connection}
          isEditing={isEditing}
          onFocus={handleClickOrFocus}
        />
        <BusConnectionsList
          connectedAssetIds={connectedAssetIds}
          setSelectedAssetIndexes={setSelectedAssetIndexes}
        />
      </CollapsibleListItem> :
      <ListItem key={index} disableGutters component='div'>
        <ListItemText primary={title} secondary={description} />
      </ListItem>
  })
}
