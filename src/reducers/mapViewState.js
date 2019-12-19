import produce from 'immer'
import {
  SET_MAP_VIEW_STATE,
} from '../constants'

const initialState = {
  // longitude: 0,
  // latitude: 0,
  // zoom: 0,
  longitude: -93.25845423170956,
  latitude: 37.24365675372345, 
  zoom: 16,
  pitch: 0,
  bearing: 0,
  width: window.innerWidth,
  height: window.innerHeight,
}

const mapViewState = produce((draft, action) => {
  switch (action.type) {
    case SET_MAP_VIEW_STATE: {
      const {
        longitude,
        latitude,
        zoom,
        pitch,
        bearing,
        width,
        height,
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
    default: {
    }
  }
}, initialState)

export default mapViewState
