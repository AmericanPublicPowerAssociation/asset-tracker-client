import {
  SET_FOCUSING_ASSET,
} from '../constants'


const initialState = null


const focusingAssetId = (state=initialState, action) => {
  const actionType = action.type

  if (SET_FOCUSING_ASSET === actionType) {
    const {id} = action.payload
    return id
  }

  return state
}


export default focusingAssetId
