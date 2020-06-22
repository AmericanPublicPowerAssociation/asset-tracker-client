import {
  SET_MAP_VIEW_STATE,
  SET_POPUP_STATE,
  SET_SELECTION,
} from '../constants'

const initialState = null

export default function popUpState(state=initialState, action) {
  switch (action.type) {
    case SET_POPUP_STATE: {
      return action.payload
    }
    case SET_SELECTION:
    case SET_MAP_VIEW_STATE: {
      return initialState
    }
    default: {
      return state
    }
  }
}
