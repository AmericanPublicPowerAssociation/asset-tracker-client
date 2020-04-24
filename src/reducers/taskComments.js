import {
  SET_TASK_COMMENTS,
} from '../constants'

const initialState = {}

const taskComments = (state = initialState, action) => {
  switch(action.type) {
    case SET_TASK_COMMENTS: {
      const { task_id, comments } = action.payload

      return {
        task_id,
        comments: comments || [],
      }
    }
    default: {
      return state
    }
  }
}

export default taskComments
