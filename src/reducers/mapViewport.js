import { Map } from 'immutable'
import {
  MAP_PADDING,
  SET_MAP_VIEWPORT,
} from '../constants'


const initialState = Map({
  longitude: 0,
  latitude: 0,
  reset: true,
  width: MAP_PADDING * 2 + 1,
  height: MAP_PADDING * 2 + 1,
})


const mapViewport = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAP_VIEWPORT: {
      return state.merge(
        action.payload,
      ).mergeDeep({
        transitionDuration: 0,
      })
    }
    default: {
      return state
    }
  }
}


export default mapViewport
