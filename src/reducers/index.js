import { combineReducers } from 'redux'
import mapStyleName from './mapStyleName'
import sketchMode from './sketchMode'

const reduce = combineReducers({
  mapStyleName,
  sketchMode,  // Keep last
})

export default reduce
