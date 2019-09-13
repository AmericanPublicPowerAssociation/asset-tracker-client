import { List } from 'immutable'
import {
  RESET_LOGS,
} from '../constants'


const initialState = List()


const logs = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LOGS: {
      const logs = action.payload
      return logs
    }
    default: {
      return state
    }
  }
}


export default logs
