import {
  ADD_ASSET,
  ASSET_BY_ID,
} from '../constants'

const initialState = Object.keys(ASSET_BY_ID)

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
