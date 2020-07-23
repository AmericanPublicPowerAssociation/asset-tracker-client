import {
  SKETCH_MODE_ADD,
  SET_ASSET,
  SET_SKETCH_MODE,
  SKETCH_MODE,
} from '../constants'

const initialState = SKETCH_MODE

export default function sketchMode(state=initialState, action) {
  switch (action.type) {
    case SET_SKETCH_MODE: {
      return action.payload
    }
    case SET_ASSET: {
      return SKETCH_MODE_ADD
    }
    default: {
      return state
    }
  }
}
