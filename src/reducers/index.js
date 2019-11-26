import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

const reduceHorizontally = combineReducers({
})

const reduceVertically = (state, action) => {
  return state
}

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
