import { Map } from 'immutable'
import {
  RESET_TASKS,
  SET_TASK,
} from '../constants'
import {
  getById,
} from '../macros'
  

const initialState = Map()


const taskById = (state = initialState, action) => {
  switch (action.type) {
    case RESET_TASKS: {
      const tasks = action.payload
      return getById(tasks, initialState)
    }
    case SET_TASK: {
      const task = action.payload
      const id = task.get('id')
      return state.set(id, task)
    }
    default: {
      return state
    }
  }
}


export default taskById
