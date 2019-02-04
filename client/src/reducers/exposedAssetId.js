import {
  SET_EXPOSED_ASSET,
} from '../constants'

const initialState = null

const exposedAssetId = (state=initialState, action) => {
  const actionType = action.type

  if (SET_EXPOSED_ASSET === actionType) {
    const {id} = action.payload
    return id
  }

  return state
}

export default exposedAssetId
