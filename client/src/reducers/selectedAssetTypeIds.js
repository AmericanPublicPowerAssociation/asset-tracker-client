import {
  SELECTED_ASSET_TYPE_IDS,
  TOGGLE_SELECTED_ASSET_TYPE,
  ADD_SELECTED_ASSET_TYPE,
  SET_SELECTED_ASSET_TYPES,
} from '../constants'

const initialState = SELECTED_ASSET_TYPE_IDS

const selectedAssetTypeIds = (state=initialState, action) => {
  const actionType = action.type

  if (TOGGLE_SELECTED_ASSET_TYPE === actionType) {
    const {id} = action.payload
    return state.includes(id) ? state.filter(x => x !== id) : state.push(id)
  } else if (ADD_SELECTED_ASSET_TYPE === actionType) {
    const {id} = action.payload
    return state.includes(id) ? state : state.push(id)
  } else if (SET_SELECTED_ASSET_TYPES === actionType) {
    const {ids} = action.payload
    return state.withMutations(state => {
      state.clear()
      state.concat(ids)
    })
  }
  
  return state
}

export default selectedAssetTypeIds
