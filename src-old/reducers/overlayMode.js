import {
  OVERLAY_MODE,
  SET_OVERLAY_MODE,
} from '../constants'

const initialState = OVERLAY_MODE

const overlayMode = (state=initialState, action) => {
  switch (action.type) {
    case SET_OVERLAY_MODE: {
      const overlayMode = action.payload
      return overlayMode
    }
    default: {
      return state
    }
  }
}

export default overlayMode
