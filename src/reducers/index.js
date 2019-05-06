import { combineReducers } from 'redux-immutable'
import reduceReducers from 'reduce-reducers'

const reduceHorizontally = combineReducers({
})

const reduceVertically = (state, action) => {
}

export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
