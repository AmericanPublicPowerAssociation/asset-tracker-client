import {
  DELETE_ASSET,
  SELECTED_BUS_ID,
  SET_SELECTED_BUS_ID,
} from '../constants'

export const initialState = SELECTED_BUS_ID

const selectedBusId = (state=initialState, action) => {
  switch(action.type) {
    case SET_SELECTED_BUS_ID: {
      return action.payload
    }
    case DELETE_ASSET: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default selectedBusId
