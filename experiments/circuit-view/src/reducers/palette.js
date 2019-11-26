import { TOGGLE_PALETTE } from '../constants'
const initialState = false

const palette = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_PALETTE: {
      return !state
    }
    default:{
      return state
    }
  
  }
}

export default palette
