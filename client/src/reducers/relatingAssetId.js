import {
  SET_RELATING_ASSET,
} from '../constants'

const initialState = null

const relatingAssetId = (state=initialState, action) => {
  const actionType = action.type

  if (SET_RELATING_ASSET === actionType) {
    const {id} = action.payload
    return id
  }

  return state
}

export default relatingAssetId
