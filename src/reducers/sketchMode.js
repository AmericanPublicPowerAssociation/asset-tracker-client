import {
  SET_SKETCH_MODE,
  SKETCH_MODE,
} from '../constants'

const initialState = SKETCH_MODE

export default function sketchMode(state=initialState, action) {
  switch (action.type) {
    case SET_SKETCH_MODE: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
