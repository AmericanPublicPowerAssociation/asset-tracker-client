import {
  SET_TASKS,
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
    default: {
      return state
    }
  }
}

export default taskById
