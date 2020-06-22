// TODO: Review from scratch

import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import getCentroid from '@turf/centroid'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  setSelectedAssetId,
  setPopUpState,
  // setSelectedAssetIndexes,
} from '../actions'
import {
  CLICK_DELAY,
} from '../constants'
import {
  getAssetDescription,
} from '../routines'
import {
  getAssetById,
  getAssetsGeoJson,
  getAssetTypeByCode,
  getMapWebMercatorViewPort,
} from '../selectors'

function cancellablePromise(promise) {
  let isCancelled = false

  const wrappedPromise = new Promise( (resolve, reject) => {
    promise.then(
      value => (isCancelled ? reject({ isCancelled, value }): resolve(value)),
      error => reject({ isCancelled, error }),
    )
  })

  return {
    promise: wrappedPromise,
    cancel: () => (isCancelled = true),
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function useCancellablePromises() {
  const pendingPromises = useRef([])

  function appendPendingPromise(promise) {
    pendingPromises.current = [...pendingPromises.current, promise]
  }

  function removePendingPromise(promise) {
    pendingPromises.current = pendingPromises.current.filter(p => p !== promise)
  }

  function clearPendingPromises() {
    pendingPromises.current.map(p => p.cancel())
  }

  return {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  }
}

function useClickPreventionOnDoubleClick(onClick, onDoubleClick) {
  const api = useCancellablePromises()

  function handleClick(assetId) {
    api.clearPendingPromises()
    const waitForClick = cancellablePromise(delay(CLICK_DELAY))
    api.appendPendingPromise(waitForClick)
    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick)
        onClick(assetId)
      })
      .catch(errorInfo => {
        api.removePendingPromise(waitForClick)
        if (!errorInfo.isCancelled) {
          throw errorInfo.error
        }
      })
  }

  function handleDoubleClick(assetId) {
    api.clearPendingPromises()
    onDoubleClick(assetId)
  }

  return [handleClick, handleDoubleClick]
}


export default function BusConnectionsList({ connectedAssetIds }) {
  const dispatch = useDispatch()
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const mapWebMercatorViewPort = useSelector(getMapWebMercatorViewPort)

  function onClickFocusOnAsset(assetId) {
    dispatch(setSelectedAssetId(assetId))
    onClickHighlight(assetId)
  }

  function onClickHighlight(assetId) {
    const { features } = assetsGeoJson
    const feature = features.find(feature => feature.properties.id === assetId)
    const centroid = getCentroid(feature)
    // const index = features.findIndex(feature => feature.properties.id === assetId)
    // TODO: Fix and consider replacing with TextLayer
    // index > -1 && dispatch(setSelectedAssetIndexes([index]))
    // console.log(lngLatToWorld(centroid.geometry.coordinates))
    const [x, y] = mapWebMercatorViewPort.project(centroid.geometry.coordinates)
    const text = getAssetDescription(assetId, assetById, assetTypeByCode)
    dispatch(setPopUpState({ x, y, text }))
  }

  const [onClick, onDoubleClick] = useClickPreventionOnDoubleClick(
    onClickHighlight,
    onClickFocusOnAsset)

  return (
    <List component='div' disablePadding>
    {connectedAssetIds.map((connectedAssetId, connectedAssetIdIndex) => {
      const connectedAsset = assetById[connectedAssetId]
      const connectedAssetTypeCode = connectedAsset.typeCode
      const connectedAssetType = assetTypeByCode[connectedAssetTypeCode]
      const connectedAssetTypeName = connectedAssetType.name
      const connectedAssetName = connectedAsset.name
      return (
        <ListItem
          onClick={() => onClick(connectedAssetId)}
          onDoubleClick={() => onDoubleClick(connectedAssetId)}
          disableGutters component='div' key={connectedAssetIdIndex}
        >
          <Tooltip title={connectedAssetTypeName} placement='left'>
            <ListItemIcon>
              <AssetTypeSvgIcon assetTypeCode={connectedAssetTypeCode} />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary={connectedAssetName}/>
        </ListItem>
      )
    })}
    </List>
  )
}
