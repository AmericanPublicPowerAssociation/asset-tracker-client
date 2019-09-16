import { Set } from 'immutable'
import {
  SET_SELECTED_ASSET,
  TOGGLE_SELECTED_ASSET,
} from '../constants'


const initialState = Set()


const selectedAssetIds = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_ASSET: {
      const value = action.payload
      return state.update( set => set.has(value) ? 
        set.delete(value) :
        set.add(value ))
    }

    case SET_SELECTED_ASSET: {
      const {ids} = action.payload
      return Set(ids)
    } 
    default: {
      return state
    }
  }
}


export default selectedAssetIds
