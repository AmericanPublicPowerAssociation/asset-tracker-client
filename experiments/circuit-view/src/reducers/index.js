import { combineReducers } from 'redux'
import nodes from './nodes'
import edges from './edges'
import palette from './palette'
import focusedNode from './focusedNode'


const allReducers = combineReducers({
  nodes,
  edges,
  palette,
  focusedNode,
})


export default allReducers
