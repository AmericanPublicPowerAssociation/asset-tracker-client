import {
  SELECTED_ASSET_TYPE_IDS,
  ADD_SELECTED_ASSET_TYPE,
  TOGGLE_SELECTED_ASSET_TYPE,
} from '../constants'

const initialState = SELECTED_ASSET_TYPE_IDS

const selectedAssetTypeIds = (state=initialState, action) => {
  const actionType = action.type

  if (TOGGLE_SELECTED_ASSET_TYPE === actionType) {
    const {id} = action.payload
    return state.includes(id) ? state.filter(x => x !== id) : [...state, id]
  } else if (ADD_SELECTED_ASSET_TYPE === actionType) {
    const {id} = action.payload
    if (!state.includes(id)) {
      state = [...state, id]
    }
    return state
  }
  return state
}

export default selectedAssetTypeIds
