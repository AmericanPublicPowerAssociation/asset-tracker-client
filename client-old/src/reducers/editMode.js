import {TOGGLE_EDIT} from '../actions'


export default (state=false, action) => {
  if (action.type === TOGGLE_EDIT) {
    return action.editMode
  } else {
    return state
  }
}
