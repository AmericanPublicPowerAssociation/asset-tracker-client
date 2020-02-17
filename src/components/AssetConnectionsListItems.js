import React, { useState } from 'react'
import produce from 'immer'
import CollapsibleListItem from './CollapsibleListItem'

export default function AssetConnectionsListItems(props) {
  const {
    asset,
  } = props
  const [isOpenByBusId, setIsOpenByBusId] = useState({})
  const connections = asset.connections || []

  return connections.map((connection, connectionIndex) => {
    const connectionName = `Bus ${connectionIndex + 1}`
    const busId = connection.busId
    const isOpen = isOpenByBusId[busId]

    function setIsOpen(value) {
      const state = isOpenByBusId
      const nextState = produce(state, draft => {
        draft[busId] = value
      })
      setIsOpenByBusId(nextState)
    }

    return (
      <CollapsibleListItem
        title={connectionName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        Bus Details
      </CollapsibleListItem>
    )
  })
}
