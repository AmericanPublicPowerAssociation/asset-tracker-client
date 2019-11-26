import { Map } from 'immutable'
import {
  RESET_DASHBOARDS,
} from '../constants'


const initialState = Map()


const dashboards = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DASHBOARDS: {
      const dashboards = action.payload
      return dashboards
    }
    default: {
      return state
    }
  }
}


export default dashboards
