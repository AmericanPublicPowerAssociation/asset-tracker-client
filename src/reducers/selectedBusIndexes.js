import {
  SET_SELECTED_BUS_INDEXES,
} from '../constants'

const initialState = []


const selectedBusIndexes = (state=initialState, action) => {
  switch(action.type) {
    case SET_SELECTED_BUS_INDEXES: {
      const selectedBusIndexes = action.payload
      return selectedBusIndexes 
    }

    default: { 
      return state 
    }
  }
}


export default selectedBusIndexes
