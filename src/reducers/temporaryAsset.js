import {
  SET_ASSET,
  SET_SKETCH_MODE,
  SET_TEMPORARY_ASSET,
} from '../constants'

const initialState = null

export default function temporaryAsset(state=initialState, action) {
  switch(action.type) {
    case SET_TEMPORARY_ASSET: {
      return action.payload
    }
    case SET_SKETCH_MODE:
    case SET_ASSET: {
      return initialState
    }
    default: {
      return state
    }
  }
}
