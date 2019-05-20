import { Map } from 'immutable'
import {
  SET_ADDING_ASSET,
} from '../constants'


const initialState = Map()


const addingAsset = (state=initialState, action) => {
  switch (action.type) {
    case SET_ADDING_ASSET: {
      return state.merge(action.payload)
    }
    default:
      return state
  }
}


export default addingAsset
