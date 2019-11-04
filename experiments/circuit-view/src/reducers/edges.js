import { fromJS } from  'immutable'
import {
  CREATE_NEW_EDGES,
  DELETE_EDGES,
  UPDATE_EDGES,
} from '../constants' 

const initialState = fromJS({
  '-1': {key: '-1', from: 0, fromPort:"out", to: 1, toPort:"in"},
  '-2': {key: '-2', from: 0, fromPort:"out", to: 2, toPort:"in"},
})


const edges = (state = initialState, action) => {
  switch(action.type){
    case CREATE_NEW_EDGES: {
      const insertedKeys = action.payload.insertedLinkKeys
      const newEdges = action.payload.modifiedLinkData
        .reduce( (map, data) => {
          if (insertedKeys.includes(data.key)) {
            data.key = String(data.key)
            map[data.key] = data
          }
          return map
        }, {})
      return state.merge(fromJS(newEdges))
    }
    case DELETE_EDGES: {
      const removedKeys = action.payload.removedLinkKeys
      return state.deleteAll(removedKeys)
    }
    case UPDATE_EDGES: {
      const links = action.payload.modifiedLinkData 
        .reduce( (map, data) => {
          data.key = String(data.key)
          map[data.key] = data
          return map
        }, {})
      return state.mergeDeep(fromJS(links))
    }
    default:
      return state
  }
}

export default edges
