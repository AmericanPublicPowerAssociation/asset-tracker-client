import {
  DELETE_ASSET,
  SET_SELECTED_BUS_ID,
} from '../constants'

const initialState = null

const selectedBusId = (state=initialState, action) => {
  switch(action.type) {
    case SET_SELECTED_BUS_ID: {
      const busId = action.payload
      return busId
    }
    case DELETE_ASSET: {
      return null
    }
    default: {
      return state
    }
  }
}

export default selectedBusId
