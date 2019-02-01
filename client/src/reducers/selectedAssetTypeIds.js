import {
  ADD_SELECTED_ASSET_TYPE,
  REMOVE_SELECTED_ASSET_TYPE,
  TOGGLE_SELECTED_ASSET_TYPE,
} from '../constants'
import {
  SELECTED_ASSET_TYPE_IDS,
} from '../constants'

const initialState = SELECTED_ASSET_TYPE_IDS

const selectedAssetTypeIds = (state=initialState, action) => {
  const { assetTypeId } = action
  switch (action.type) {
    case ADD_SELECTED_ASSET_TYPE:
      if (!state.includes(assetTypeId)) {
        state = [...state, assetTypeId]
      }
      return state
    case REMOVE_SELECTED_ASSET_TYPE:
      return state.filter(x => x !== assetTypeId)
    case TOGGLE_SELECTED_ASSET_TYPE:
      return state.includes(assetTypeId) ?
        state.filter(x => x !== assetTypeId) :
        [...state, assetTypeId]
    default:
      return state
  }
}

export default selectedAssetTypeIds
