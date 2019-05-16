// import { fromJS } from 'immutable'
import {
  MAP_VIEWPORT,
  SET_MAP_VIEWPORT,
} from '../constants'

const initialState = MAP_VIEWPORT

const mapViewport = (state=initialState, action) => {
  const actionType = action.type

  if (SET_MAP_VIEWPORT === actionType) {
    const {longitude, latitude, zoom} = action.payload
    return state.merge({
      longitude,
      latitude,
      zoom,
    })
  }

  return state
}

export default mapViewport
