import {
  ASSET_BY_ID,
  ADD_ASSET,
  UPDATE_ASSET,
} from '../constants'

const initialState = ASSET_BY_ID

const assetById = (state=initialState, action) => {
  const actionType = action.type

  if (ADD_ASSET === actionType || UPDATE_ASSET === actionType) {
    const {id, ...asset} = action.payload
    return Object.assign({}, state, {[id]: asset})
  }

  return state
}

export default assetById
