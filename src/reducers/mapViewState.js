import produce from 'immer'
import centroid from '@turf/centroid'
import {
  CENTER_MAP,
  MAP_VIEW_STATE,
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
    case SET_ASSETS: {
      const { boundingBox } = action.payload
      if (!boundingBox || draft.preventReset) return
      const viewState = getMapViewStateFromBoundingBox(
        boundingBox, draft.width, draft.height)
      if (!viewState) return
      transferViewState(draft, viewState)
      draft.preventReset = true
      break
    }
    case CENTER_MAP: {
      const geojsonFeature = action.payload
      const pointGeojson = centroid(geojsonFeature)
      const [ longitude, latitude ] = pointGeojson.geometry.coordinates
      draft.longitude = longitude
      draft.latitude = latitude
      break
    }
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
