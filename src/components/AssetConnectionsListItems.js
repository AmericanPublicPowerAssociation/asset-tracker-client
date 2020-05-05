import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import produce from 'immer'
import CollapsibleListItem from './CollapsibleListItem'
import BusAttributesListItem from './BusAttributesListItem'
import BusConnectionsList from './BusConnectionsList'
import {
  setFocusingBusId,
  setSelectedBusIndexes,
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

export default function AssetConnectionsListItems({ asset, isEditing }) {
  const dispatch = useDispatch()
  const [isOpenByIndex, setIsOpenByIndex] = useState({})
  const busesGeoJson = useSelector(getBusesGeoJson)
  const focusingBusId = useSelector(getFocusingBusId)
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const connections = asset.connections || {}

  return Object.entries(connections).map(([index, connection]) => {
    const { busId } = connection
    const connectedAssetIds = getConnectedAssetIds(
      assetId, busId, assetIdsByBusId)
    const connectedAssetCount = connectedAssetIds.length
    const title = 'Bus ' + index
    const description = getCountDescription(connectedAssetCount, 'connection')
    const isOpen = isOpenByIndex[index]
    const isHighlighted = focusingBusId === busId

    function setIsOpen(value) {
      setIsOpenByIndex(produce(isOpenByIndex, draft => {
        draft[index] = value
      }))
    }

    function handleClickOrFocus() {
      const featureIndex = busesGeoJson.features.findIndex(
        feature => feature.properties.id === busId)
      if (featureIndex > -1) {
        dispatch(setSelectedBusIndexes([featureIndex]))
      }
      dispatch(setFocusingBusId(busId))
    }

    return connectedAssetCount > 0 ?
      <CollapsibleListItem
        key={index}
        title={title}
        description={description}
        isHighlighted={isHighlighted}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleClickOrFocus}
      >
        <BusAttributesListItem
          assetId={assetId}
          assetTypeCode={assetTypeCode}
          connection={connection}
          isEditing={isEditing}
          onFocus={handleClickOrFocus}
        />
        <BusConnectionsList connectedAssetIds={connectedAssetIds} />
      </CollapsibleListItem> :
      <ListItem
        key={index}
        component='div'
        className={clsx({
          highlighted: isHighlighted,
        })}
        disableGutters
      >
        <ListItemText primary={title} secondary={description} />
      </ListItem>
  })
}
