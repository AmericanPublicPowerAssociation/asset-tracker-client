import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import mapViewState from './mapViewState'

const reduceHorizontally = combineReducers({
  mapViewState,
})

const reduceVertically = (state, action) => {
  return state
}

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
