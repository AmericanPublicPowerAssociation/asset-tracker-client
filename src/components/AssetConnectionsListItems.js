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
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/core/styles/useTheme'

export default function AssetConnectionsListItems({
  asset,
  isEditing,
  // TODO: Rename
  noHighlight,
  expand,
}) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))
  const [isOpenByIndex, setIsOpenByIndex] = useState({})
  const busesGeoJson = useSelector(getBusesGeoJson)
  const focusingBusId = useSelector(getFocusingBusId)
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const connections = asset.connections || {}
  console.log('isNotMobile', isNotMobile, connections, expand)
  console.log(isNotMobile || expand)

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

    // TODO: Fix unclear isNotMobile || expand syntax
    // TODO: Replace <></> technique (causing missing index warning)
    return connectedAssetCount > 0 ?
      <CollapsibleListItem
        key={index}
        title={title}
        description={(isNotMobile || expand) ? description : null}
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
      ( isNotMobile || expand ?
      <ListItem
        key={index}
        className={clsx({ highlighted: isHighlighted })}
        component='div'
        disableGutters
      >
        <ListItemText primary={title} secondary={description} />
      </ListItem>
      : <></>)
  })
}
