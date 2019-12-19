import { Map } from 'immutable'
import {
  MAP_PADDING,
  SET_MAP_VIEWPORT,
} from '../constants'

export const DEFAULT_MAP_W_H = MAP_PADDING * 2 + 1

const initialState = Map({
  reset: true,
  width: DEFAULT_MAP_W_H,
  height: DEFAULT_MAP_W_H,
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
