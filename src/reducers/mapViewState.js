import produce from 'immer'
import centroid from '@turf/centroid'
import {
  MAP_VIEW_STATE,
  PAN_MAP_TO_ASSET,
  SET_ASSETS,
  SET_MAP_VIEW_STATE,
} from '../constants'
import {
  getMapViewStateFromBoundingBox,
} from '../routines'

const initialState = MAP_VIEW_STATE

const mapViewState = produce((draft, action) => {
  switch (action.type) {
    case SET_MAP_VIEW_STATE: {
      const viewState = action.payload
      transferViewState(draft, viewState)
      break
    }
    // TODO: Review below code
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
    // TODO: Review above code
    default: {}
  }
}, initialState)

function transferViewState(targetState, sourceState) {
  targetState.longitude = sourceState.longitude
  targetState.latitude = sourceState.latitude
  targetState.zoom = sourceState.zoom
  targetState.pitch = sourceState.pitch
  targetState.bearing = sourceState.bearing
  targetState.width = sourceState.innerWidth
  targetState.height = sourceState.innerHeight
  targetState.altitude = sourceState.altitude
}

export default mapViewState
