import { List } from 'immutable'
import {
  ADD_SELECTED_ASSET_TYPE,
  SELECTED_ASSET_TYPE_IDS,
  TOGGLE_SELECTED_ASSET_TYPE,
} from '../constants'


const initialState = List(SELECTED_ASSET_TYPE_IDS)


const selectedAssetTypeIds = (state=initialState, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_ASSET_TYPE: {
      const {typeId} = action.payload
      return state.includes(typeId) ?
        state.filter(o => o !== typeId) :
        state.push(typeId)
    }
    case ADD_SELECTED_ASSET_TYPE: {
      const {typeId} = action.payload
      return state.includes(typeId) ?
        state :
        state.push(typeId)
    }
    default:
      return state
  }
}


export default selectedAssetTypeIds
