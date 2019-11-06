import { fromJS } from 'immutable'
import {
  CREATE_NEW_NODES,
  DELETE_NODES,
  UPDATE_NODES,
} from '../constants'

const initialState = fromJS({
  '0': { key: '0', text: 'Alpha', color: 'lightblue', loc: '0 0', type: 'meter' },
  '1': { key: '1', text: 'Beta', color: 'orange', loc: '150 0' },
  '2': { key: '2', text: 'Gamma', color: 'lightgreen', loc: '0 150' },
  '3': { key: '3', text: 'Delta', color: 'pink', loc: '300 150' } 
})

const nodes = (state = initialState, action) => {
  switch(action.type){
    case CREATE_NEW_NODES: {
      const insertedKeys = action.payload.insertedNodeKeys
      const newNodes = action.payload.modifiedNodeData
        .reduce( (map, data) => {
          if (insertedKeys.includes(data.key)) {
            data.key = String(data.key)
            map[data.key] = data
          }
          return map
        }, {})
      return state.merge(fromJS(newNodes))
    }
    case DELETE_NODES: {
      const removedKeys = action.payload.removedNodeKeys
      return state.deleteAll(removedKeys)
    }
    case UPDATE_NODES: {
      const nodes = action.payload.modifiedNodeData
        .reduce( (map, data) => {
          data.key = String(data.key)
          map[data.key] = data
          return map
        }, {})
      return state.mergeDeep(fromJS(nodes))
    }
    default:
      return state
  }
}


export default nodes
