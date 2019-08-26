import {
  RESET_ASSETS_LOGS,
} from '../constants'


const initialState = null


const assetsLogs = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ASSETS_LOGS: {
      const assetsLogs = action.payload
      return assetsLogs
    }
    default: {
      return state
    }
  }
}


export default assetsLogs
