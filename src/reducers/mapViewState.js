import produce from 'immer'
import {
  getMapviewFromBoudingBox,
} from '../routines'
import {
  MAP_VIEW_STATE,
  SET_MAP_BOUNDING_BOX,
  SET_MAP_VIEW_STATE,
} from '../constants'

const initialState = MAP_VIEW_STATE

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
    case SET_MAP_BOUNDING_BOX: {
      const boundingBox = action.payload
      if (draft['reset']) return
      const viewport = getMapviewFromBoudingBox(boundingBox, window.innerWidth, window.innerHeight)
      if (!viewport) return
      const {
        longitude,
        latitude,
        zoom,
        pitch,
        bearing,
        width,
        height,
      } = viewport
      draft.longitude = longitude
      draft.latitude = latitude
      draft.zoom = zoom
      draft.pitch = pitch
      draft.bearing = bearing
      draft.width = width
      draft.height = height
      draft.reset = true
      break
    }
    default: { }
  }
}, initialState)

export default mapViewState
