import {
  SET_LOCATING_ASSET,
} from '../constants'

const initialState = null

const locatingAssetId = (state=initialState, action) => {
  const actionType = action.type

  if (SET_LOCATING_ASSET === actionType) {
    const {id} = action.payload
    return id
  }

  return state
}

export default locatingAssetId
