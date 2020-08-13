// TODO: Review from scratch

import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import produce from 'immer'
import CollapsibleListItem from './CollapsibleListItem'
import BusAttributesListItem from './BusAttributesListItem'
import BusConnectionsList from './BusConnectionsList'
import {
  setSelectedBusId,
  setSelectedBusIndexes,
} from '../actions'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getCountDescription,
} from '../macros'
import {
  getConnectedAssetIds,
} from '../routines'
import {
  getAssetIdsByBusId,
  getBusesGeoJson,
  getSelectedBusId,
} from '../selectors'

export default function AssetConnectionsListItems({
  asset,
  isEditing,
  // TODO: Rename
  noHighlight,
  expand,
  styling,
}) {
  const dispatch = useDispatch()
  const isLayoutMobile = useContext(IsLayoutMobileContext)
  const [isOpenByIndex, setIsOpenByIndex] = useState({})
  const busesGeoJson = useSelector(getBusesGeoJson)
  const selectedBusId = useSelector(getSelectedBusId)
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
    const isHighlighted = selectedBusId === busId

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
      dispatch(setSelectedBusId(busId))
    }

    // TODO: Fix unclear isNotMobile || expand syntax
    // TODO: Replace <></> technique with just not showing component
    return connectedAssetCount > 0 ?
      <CollapsibleListItem
        key={index}
        title={title}
        description={(!isLayoutMobile || expand) ? description : null}
        isHighlighted={isHighlighted}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleClickOrFocus}
        styling={styling}
      >
        <BusAttributesListItem
          assetId={assetId}
          assetTypeCode={assetTypeCode}
          connection={connection}
          isEditing={isEditing}
          onFocus={handleClickOrFocus}
          connectionIndex={index}
        />
        <BusConnectionsList connectedAssetIds={connectedAssetIds} />
      </CollapsibleListItem> :
      ( !isLayoutMobile || expand ?
      <ListItem
        key={index}
        className={clsx({ highlighted: isHighlighted }, styling)}
        component='div'
        disableGutters
        onClick={handleClickOrFocus}
      >
        <ListItemText primary={title} secondary={description} />
      </ListItem>
      : null)
  })
}
