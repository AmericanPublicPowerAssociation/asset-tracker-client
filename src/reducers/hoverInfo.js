import {
  SET_HOVER_INFO,
  SET_MAP_VIEW_STATE,
} from '../constants'

const initialState = null

const hoverInfo = (state=initialState, action) => {
  switch(action.type) {
    case SET_HOVER_INFO: {
      return action.payload
    }
    case SET_MAP_VIEW_STATE: {
      return null
    }
    default: {
      return state
    }
  }
}

export default hoverInfo
