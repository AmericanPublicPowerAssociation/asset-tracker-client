import { Set } from 'immutable'
import {
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
    default: {
      return state
    }
  }
}


export default selectedAssetIds
