import {
  DELETE_ASSET,
  SELECTED_BUS_INDEXES,
  SET_SELECTED_BUS_INDEXES,
} from '../constants'

export const initialState = SELECTED_BUS_INDEXES

const selectedBusIndexes = (state=initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_BUS_INDEXES: {
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

export default selectedBusIndexes
