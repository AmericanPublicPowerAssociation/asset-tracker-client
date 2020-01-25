import {
  SET_FOCUSING_BUS_ID,
} from '../constants'

const initialState = null

const focusingBusId = (state = initialState, action) => {
  switch(action.type) {
    case SET_FOCUSING_BUS_ID: {
      const id = action.payload
      return id
    }
    default: {
      return state
    }
  }
}

export default focusingBusId
