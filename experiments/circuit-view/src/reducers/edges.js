import { fromJS } from  'immutable'
import { CREATE_NEW_EDGES } from '../constants' 

const initialState = fromJS({
  '-1': {key: '-1', from: 0, fromPort:"out", to: 1, toPort:"in"},
  '-2': {key: '-2', from: 0, fromPort:"out", to: 2, toPort:"in"},
})


const edges = (state = initialState, action) => {
  switch(action.type){
    case CREATE_NEW_EDGES: {
      console.log('created new edges')
      return state
    }
    default:
      return state
  }
}

export default edges
