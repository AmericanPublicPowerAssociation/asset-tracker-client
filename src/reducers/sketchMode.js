import {
  SET_ASSETS_GEOJSON,
  SET_SKETCH_MODE,
  SKETCH_MODE,
  SKETCH_MODE_EDIT,
} from '../constants'

const initialState = SKETCH_MODE

export default function sketchMode(state=initialState, action) {
  switch (action.type) {
    case SET_SKETCH_MODE: {
      return action.payload
    }
    case SET_ASSETS_GEOJSON: {
      return SKETCH_MODE_EDIT
    }
    default: {
      return state
    }
  }
}
