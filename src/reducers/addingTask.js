import { Map } from 'immutable'
import {
  CLOSE_TASK_ADD_DIALOG,
  OPEN_TASK_ADD_DIALOG,
  SET_ADDING_TASK_ERRORS,
  SET_ADDING_TASK_VALUE,
} from '../constants'


const initialState = Map({
  isOpen: false,
  name: '',
  errors: Map(),
})


const addingTask = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TASK_ADD_DIALOG: {
      return state.set('isOpen', true)
    }
    case CLOSE_TASK_ADD_DIALOG: {
      return state.set('isOpen', false)
    }
    case SET_ADDING_TASK_VALUE: {
      return state.merge(action.payload)
    }
    case SET_ADDING_TASK_ERRORS: {
      return state.set('errors', action.payload)
    }
    default: {
      return state
    }
  }
}


export default addingTask
