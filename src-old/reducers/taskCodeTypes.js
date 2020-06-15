import {
  SET_TASKS,
} from '../constants'
import {
  getByKey,
} from '../macros'

const initialState = {}

const taskCodeTypes = (state = initialState, action) => {
  switch(action.type) {
    case SET_TASKS: {
      const { taskPriorityTypes, taskStatusTypes } = action.payload
      if (!taskPriorityTypes || !taskStatusTypes) {
        return state
      }
      return {
        taskPriorityTypes: getByKey(taskPriorityTypes, 'code'),
        taskStatusTypes: getByKey(taskStatusTypes, 'code'),
      }
    }
    default: {
      return state
    }
  }
}

export default taskCodeTypes
