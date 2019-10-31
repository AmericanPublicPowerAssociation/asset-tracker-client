import { combineReducers } from 'redux'
import assets from './assets'
import edges from './edges'


const allReducers = combineReducers({
  assets,
  edges,
})


export default allReducers
