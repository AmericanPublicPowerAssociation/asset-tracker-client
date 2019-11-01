import { combineReducers } from 'redux'
import nodes from './nodes'
import edges from './edges'


const allReducers = combineReducers({
  nodes,
  edges,
})


export default allReducers
