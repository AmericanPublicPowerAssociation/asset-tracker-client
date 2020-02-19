import React, { useState } from 'react'
import produce from 'immer'
import List from '@material-ui/core/List'
import CollapsibleListItem from './CollapsibleListItem'
import BusAttributesListItem from './BusAttributesListItem'
import BusConnectionsListItems from './BusConnectionsListItems'

export default function AssetConnectionsListItems(props) {
  const {
    asset,
    isEditing,
  } = props
  const [isOpenByConnectionIndex, setIsOpenByConnectionIndex] = useState({})
  const assetId = asset.id
  const connections = asset.connections || []

  return connections.map((connection, connectionIndex) => {
    const connectionName = `Bus ${connectionIndex + 1}`
    const isOpen = isOpenByConnectionIndex[connectionIndex]

    function setIsOpen(value) {
      const state = isOpenByConnectionIndex
      const nextState = produce(state, draft => {
        draft[connectionIndex] = value
      })
      setIsOpenByConnectionIndex(nextState)
    }

    return (
      <CollapsibleListItem
        title={connectionName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <BusAttributesListItem
          assetTypeCode={asset.typeCode}
          connection={connection}
          isEditing={isEditing}
        />
        <List component='div' disablePadding>
          <BusConnectionsListItems
            assetId={assetId}
            busId={connection.busId}
          />
        </List>
      </CollapsibleListItem>
    )
  })
}
