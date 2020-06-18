// TODO: Review code from scratch

import {
  DELETE_ASSET,
  SET_SELECTED_BUS_INDEXES,
} from '../constants'

const initialState = []

const selectedBusIndexes = (state=initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_BUS_INDEXES: {
      const selectedBusIndexes = action.payload
      return selectedBusIndexes
    }
    case DELETE_ASSET: {
      return []
    }
    default: {
      return state
    }
  }
}

export default selectedBusIndexes
