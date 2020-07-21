// TODO: Review from scratch

import {
  OVERLAY_MODE,
  SET_OVERLAY_MODE,
} from '../constants'

const initialState = OVERLAY_MODE

const overlayMode = (state=initialState, action) => {
  switch (action.type) {
    case SET_OVERLAY_MODE: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export default overlayMode
