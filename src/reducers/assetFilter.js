import { Map } from 'immutable'
import {
  SET_ASSET_FILTER,
} from '../constants'


const initialState = Map()


const assetFilter = (state=initialState, action) => {
  switch (action.type) {
    case SET_ASSET_FILTER: {
      return state.merge(action.payload)
    }
    default:
      return state
  }
}


export default assetFilter
