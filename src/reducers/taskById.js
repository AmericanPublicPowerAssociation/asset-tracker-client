// TODO: Review code from scratch

import {
  SET_TASKS,
  SET_TASK_COMMENT_COUNT,
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
    case SET_TASK_COMMENT_COUNT: {
      const { id, commentCount } = action.payload
      const newTask = { ...state[id], commentCount }
      return { ...state, [id]: newTask }
    }
    default: {
      return state
    }
  }
}

export default taskById
