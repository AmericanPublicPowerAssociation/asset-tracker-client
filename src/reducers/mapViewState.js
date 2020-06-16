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
