import React, { useState } from 'react'
import produce from 'immer'
import CollapsibleListItem from './CollapsibleListItem'

export default function AssetConnectionsListItems(props) {
  const {
    asset,
  } = props
  const [isOpenByConnectionIndex, setIsOpenByConnectionIndex] = useState({})
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
        Bus Details
      </CollapsibleListItem>
    )
  })
}
