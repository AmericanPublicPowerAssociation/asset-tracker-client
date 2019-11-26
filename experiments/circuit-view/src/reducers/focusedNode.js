import { SET_FOCUSED_NODE } from '../constants'

const initialState = ''

const focusedNode = (state = initialState, action) => {
  switch(action.type){
    case SET_FOCUSED_NODE: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export default focusedNode
