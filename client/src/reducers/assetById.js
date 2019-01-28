import { ASSET_BY_ID } from '../constants'
import {
  ADD_ASSET,
  UPDATE_ASSET,
} from '../constants'

const initialState = ASSET_BY_ID

const assetById = (state=initialState, action) => {
  const { asset } = action
  switch (action.type) {
    case ADD_ASSET:
    case UPDATE_ASSET:
      return Object.assign({}, state, {[asset.id]: asset})
    default:
      return state
  }
}

export default assetById
