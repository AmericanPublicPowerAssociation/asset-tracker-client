import {
  SET_SELECTED_TASK_ID,
} from '../constants'

const initialState = null

const selectedTaskId = (state=initialState, action) => {
  const { payload } = action

  switch(action.type) {
    case SET_SELECTED_TASK_ID: {
      return payload.taskId
    }
    default: {
      return state
    }
  }
}

export default selectedTaskId 
