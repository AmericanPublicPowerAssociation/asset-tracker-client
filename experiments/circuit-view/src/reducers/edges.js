import { CREATE_NEW_EDGES } from '../constants' 

const initialState = [
  {from: 0, fromPort:"out", to: 1, toPort:"in"},
  {from: 0, fromPort:"out", to: 2, toPort:"in"},
]


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
