import {
  SET_TASKS,
  SET_TASK_NAME,
} from '../constants'
import {
  getByKey,
} from '../macros'

const initialState = {}

const taskById = (state = initialState, action) => {
  switch(action.type) {
    case SET_TASKS: {
      const { tasks } = action.payload
      return getByKey(tasks, 'id')
    }
    case SET_TASK_NAME: {
      const { id, name } = action.payload
      const newTask = {...state[id], name }
      return {...state, [id]: newTask}
    }
    default: {
      return state
    }
  }
}

export default taskById
