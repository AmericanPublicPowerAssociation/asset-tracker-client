import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import produce from 'immer'
import CollapsibleListItem from './CollapsibleListItem'
import BusAttributesListItem from './BusAttributesListItem'
import BusConnectionsList from './BusConnectionsList'
import {
  setSelectedBusIndexes,
} from '../actions'
import {
  getCountDescription,
  getLetter,
} from '../macros'
import {
  getAssetIdsByBusId,
  getBusesGeoJson,
} from '../selectors'

export default function AssetConnectionsListItems(props) {
  const {
    asset,
    isEditing,
  } = props
  const [isOpenByConnectionIndex, setIsOpenByConnectionIndex] = useState({})
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const connections = asset.connections || []
  const dispatch = useDispatch()
  const busesGeoJson = useSelector(getBusesGeoJson)

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

    function onClick() {
      const features = busesGeoJson.features
      let index = null
      for (index=0; index < features.length; index++)
        if(features[index].properties.id === busId)
            break
      if (index)
        dispatch(setSelectedBusIndexes([index]))
    }

    return connectedAssetCount > 0 ?
      <CollapsibleListItem
        key={connectionIndex}
        title={title}
        description={description}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={onClick}
      >
        <BusAttributesListItem
          assetTypeCode={assetTypeCode}
          connection={connection}
          isEditing={isEditing}
        />
        <BusConnectionsList connectedAssetIds={connectedAssetIds} />
      </CollapsibleListItem> :
      <ListItem
        disableGutters
        component='div'
        key={connectionIndex}
      >
        <ListItemText primary={title} secondary={description} />
      </ListItem>
  })
}
