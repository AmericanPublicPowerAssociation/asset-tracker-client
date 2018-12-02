import {SET_SELECTED} from '../actions'


export default (state={}, action) => {
  if (action.type === SET_SELECTED) {
    return action.asset
  }
  else {
    return state
  }
}
