import { ADD_ASSET } from '../constants'
import { SORTED_ASSET_IDS } from '../constants'

const initialState = SORTED_ASSET_IDS

const sortedAssetIds = (state=initialState, action) => {
  const { asset } = action
  switch (action.type) {
    case ADD_ASSET:
      return [asset.id, ...state]
    default:
      return state
  }
}

export default sortedAssetIds
