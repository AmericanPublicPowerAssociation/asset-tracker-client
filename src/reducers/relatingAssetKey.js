import {
  SET_RELATING_ASSET,
} from '../constants'


const initialState = null


const relatingAssetKey = (state=initialState, action) => {
  const actionType = action.type

  if (SET_RELATING_ASSET === actionType) {
    const {key} = action.payload
    return key
  }

  return state
}


export default relatingAssetKey
