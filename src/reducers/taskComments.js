import {
  SET_ASSET_COMMENTS,
} from '../constants'

const initialState = {}

const taskComments = (state = initialState, action) => {
  switch(action.type) {
    case SET_ASSET_COMMENTS: {
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
