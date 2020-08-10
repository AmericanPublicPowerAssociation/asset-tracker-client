import {
  SET_SELECTED_TASK_ID,
} from '../constants'

const initialState = {
  currentView: '',
}

const detailDrawer = (state=initialState, action) => {
  const { payload } = action

  switch(action.type) {
    case SET_SELECTED_TASK_ID: {
      return { currentView: 'task' }
    }
    default: {
      return state
    }
  }
}

export default detailDrawer
