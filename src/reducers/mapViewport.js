import { Map } from 'immutable'
import {
  SET_MAP_VIEWPORT,
} from '../constants'


const initialState = Map({
  longitude: 0,
  latitude: 0,
})


const mapViewport = (state=initialState, action) => {
  switch (action.type) {
    case SET_MAP_VIEWPORT: {
      return state.merge(action.payload)
    }
    default:
      return state
  }
}


export default mapViewport
