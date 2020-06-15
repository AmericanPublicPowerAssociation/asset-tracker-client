import produce from 'immer'
import centroid from '@turf/centroid'
import {
  getMapViewStateFromBoundingBox,
} from '../routines'
import {
  MAP_VIEW_STATE,
  PAN_MAP_TO_ASSET,
  SET_ASSETS,
  SET_MAP_VIEW_STATE,
} from '../constants'

const initialState = MAP_VIEW_STATE

const mapViewState = produce((draft, action) => {
  switch (action.type) {
    case SET_MAP_VIEW_STATE: {
      const viewState = action.payload
      transferViewState(draft, viewState)
      break
    }
    case SET_ASSETS: {
      const { boundingBox } = action.payload
      if (!boundingBox || draft['reset']) {
        return
      }
      const viewState = getMapViewStateFromBoundingBox(
        boundingBox, window.innerWidth, window.innerHeight, draft.zoom)
      if (!viewState) return
      transferViewState(draft, viewState)
      draft.reset = true
      break
    }
    // TODO: Rename
    case PAN_MAP_TO_ASSET: {
      const assetGeoJson = action.payload
      const pointGeojson = centroid(assetGeoJson)
      const [ lon, lat ] = pointGeojson.geometry.coordinates
      draft.longitude = lon
      draft.latitude = lat
      break
    }
    default: { }
  }
}, initialState)

function transferViewState(draft, viewState) {
  draft.longitude = viewState.longitude
  draft.latitude = viewState.latitude
  draft.zoom = viewState.zoom
  draft.pitch = viewState.pitch
  draft.bearing = viewState.bearing
  draft.width = window.innerWidth
  draft.height = window.innerHeight
  draft.altitude = viewState.altitude
}

export default mapViewState
