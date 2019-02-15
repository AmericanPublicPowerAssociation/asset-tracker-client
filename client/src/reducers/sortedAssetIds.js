import {
  SORTED_ASSET_IDS,
  ADD_ASSET,
} from '../constants'

const initialState = SORTED_ASSET_IDS

const sortedAssetIds = (state=initialState, action) => {
  const actionType = action.type

  if (ADD_ASSET === actionType) {
    const {id} = action.payload
    return state.unshift(id)
  }

  return state
}

export default sortedAssetIds
