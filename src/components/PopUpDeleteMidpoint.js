import React from 'react'
import { useDispatch } from 'react-redux'
import { WebMercatorViewport } from '@math.gl/web-mercator'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import {
  deleteAssetVertex,
  setAssetsGeoJson,
  setPopUpDeleteMidpoint,
} from '../actions'

export default function PopUpDeleteMidpoint({ state }) {
  const dispatch = useDispatch()
  const {
    lonlat,
    assetId,
    removedPositionIndex,
    vertexCount,
    updatedData,
    mapViewState } = state
  const width = window.innerWidth
  const height = window.innerHeight
  const [lon, lat] = lonlat
  const viewState = {
    ...mapViewState, width, height, lon, lat }
  const viewport = new WebMercatorViewport(viewState)
  const [x, y] = viewport.project(lonlat)

  const zoom = mapViewState['zoom']
  const bottom = zoom > 16 ? 45 : 35

  function handleDeleteOnClick(e) {
    dispatch(deleteAssetVertex(
          assetId, removedPositionIndex, vertexCount))
    dispatch(setAssetsGeoJson(updatedData))
    dispatch(setPopUpDeleteMidpoint(null))
  } 

  return (
    <div
      style={{ position: 'absolute', left: x, top: y }}
    >
      <Paper style={{ position: 'relative', bottom: bottom, right: 15 }}>
        <IconButton size='small' onClick={handleDeleteOnClick}>
          <DeleteIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
