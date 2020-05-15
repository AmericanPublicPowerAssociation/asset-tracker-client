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
      const {
        longitude, latitude, zoom, pitch, bearing, width, height,
      } = action.payload
      draft.longitude = longitude
      draft.latitude = latitude
      draft.zoom = zoom
      draft.pitch = pitch
      draft.bearing = bearing
      draft.width = width
      draft.height = height
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
      if (!viewState) {
        return
      }
      const {
        longitude, latitude, zoom, pitch, bearing, width, height,
      } = viewState
      draft.longitude = longitude
      draft.latitude = latitude
      draft.zoom = zoom
      draft.pitch = pitch
      draft.bearing = bearing
      draft.width = width
      draft.height = height
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

export default mapViewState
