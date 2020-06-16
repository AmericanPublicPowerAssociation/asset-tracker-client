import produce from 'immer'
import {
  MAP_VIEW_STATE,
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
    default: {}
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
