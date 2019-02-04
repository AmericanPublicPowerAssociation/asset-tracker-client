import {
  SET_EXPOSED_ASSET,
} from '../constants'

const initialState = null

const exposedAssetKey = (state=initialState, action) => {
  const actionType = action.type

  if (SET_EXPOSED_ASSET === actionType) {
    const {key} = action.payload
    return key
  }

  return state
}

export default exposedAssetKey
