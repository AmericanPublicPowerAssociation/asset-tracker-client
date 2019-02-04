import {
  SET_HIGHLIGHTED_ASSET,
} from '../constants'

const initialState = null

const highlightedAssetId = (state=initialState, action) => {
  const actionType = action.type

  if (SET_HIGHLIGHTED_ASSET === actionType) {
    const {id} = action.payload
    return id
  }

  return state
}

export default highlightedAssetId
