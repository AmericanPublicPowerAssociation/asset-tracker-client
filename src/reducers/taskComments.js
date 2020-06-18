// TODO: Review code from scratch

import {
  SET_TASK_COMMENTS,
} from '../constants'

const initialState = {}

const taskComments = (state = initialState, action) => {
  switch(action.type) {
    case SET_TASK_COMMENTS: {
      const { taskId, comments } = action.payload
      return { taskId, comments: comments || [] }
    }
    default: {
      return state
    }
  }
}

export default taskComments
