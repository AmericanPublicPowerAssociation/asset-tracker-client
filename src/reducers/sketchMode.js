import {
  ADD_ASSET,
  SET_SKETCH_MODE,
  SKETCH_MODE,
  SKETCH_MODE_ADD,
} from '../constants'

const initialState = SKETCH_MODE

export default function sketchMode(state=initialState, action) {
  switch (action.type) {
    case SET_SKETCH_MODE: {
      return action.payload
    }
    case ADD_ASSET: {
      // Add one asset at a time
      return SKETCH_MODE_ADD
    }
    default: {
      return state
    }
  }
}
