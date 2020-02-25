import {
  SET_ASSET_COMMENTS,
  SET_TASKS,
} from '../constants'
import {
  getByKey,
} from '../macros'

const initialState = {}

const taskComments = (state = initialState, action) => {
  switch(action.type) {
    case SET_ASSET_COMMENTS: {
      console.log(action)
      const {task_id, comments} = action.payload

      return {
        task_id,
        comments: comments || []
      }
    }
    default: {
      return state
    }
  }
}

export default taskComments
