import {
  SET_SKETCH_MODE,
  SKETCH_MODE,
} from '../constants'

const initialState = SKETCH_MODE

const sketchMode = (state=initialState, action) => {
  switch (action.type) {
    case SET_SKETCH_MODE: {
      const sketchMode = action.payload
      return sketchMode
    }
    default: { }
  }
  return state
}

export default sketchMode
