import { List } from 'immutable'
import {
  RESET_ASSET_TASKS,
} from '../constants'


const initialState = List()


const assetTasks = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ASSET_TASKS: {
      const assetTasks = action.payload
      return assetTasks
    }
    default: {
      return state
    }
  }
}


export default assetTasks
