import produce from 'immer'
import {
  getMapViewStateFromBoundingBox,
} from '../routines'
import {
  MAP_VIEW_STATE,
  SET_PAN_MAP_TO_ASSET,
  SET_MAP_BOUNDING_BOX,
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
    case SET_MAP_BOUNDING_BOX: {
      // TODO: Consider listening to SET_ASSETS
      const boundingBox = action.payload
      // if (draft['reset']) {
        // return
      // }
      const viewState = getMapViewStateFromBoundingBox(
        boundingBox, window.innerWidth, window.innerHeight)
      if (!viewState) return
      transferViewState(draft, viewState)
      // draft.reset = true
      break
    }
    // TODO: Rename
    case SET_PAN_MAP_TO_ASSET: {
      const assetGeoJson = action.payload
      const { type, coordinates } = assetGeoJson.geometry
      let lon, lat
      // TODO: Use centroid
      if (type === 'Point') {
        [lon, lat] = coordinates
      } else if (type === 'LineString') {
        [lon, lat] = coordinates[0]
      } else if (type === 'Polygon') {
        [lon, lat] = coordinates[0][0]
      }
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
