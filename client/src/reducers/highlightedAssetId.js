import {
  HIGHLIGHT_ASSET,
} from '../constants'

const initialState = null

const highlightedAssetId = (state=initialState, action) => {
  const { assetId } = action
  switch (action.type) {
    case HIGHLIGHT_ASSET:
      return assetId
    default:
      return state
  }
}

export default highlightedAssetId
