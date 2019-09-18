import { Map } from 'immutable'
import {
  CLOSE_TASK_EDIT_DIALOG,
  OPEN_TASK_EDIT_DIALOG,
  SET_EDITING_TASK_ERRORS,
  SET_EDITING_TASK_VALUES,
} from '../constants'


const initialState = Map({
  isOpen: false,
  name: '',
  errors: Map(),
})


const editingTask = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TASK_EDIT_DIALOG: {
      return state.set('isOpen', true)
    }
    case CLOSE_TASK_EDIT_DIALOG: {
      return state.set('isOpen', false)
    }
    case SET_EDITING_TASK_VALUES: {
      return state.merge(action.payload)
    }
    case SET_EDITING_TASK_ERRORS: {
      return state.set('errors', action.payload)
    }
    default: {
      return state
    }
  }
}


export default editingTask
