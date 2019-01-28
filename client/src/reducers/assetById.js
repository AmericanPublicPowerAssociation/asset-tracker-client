import {
  ADD_ASSET,
  ASSET_BY_ID,
} from '../constants'

const initialState = ASSET_BY_ID

const assetById = (state=initialState, action) => {
  const { asset } = action
  switch (action.type) {
    case ADD_ASSET:
      return Object.assign({}, state, {[asset.id]: asset})
    default:
      return state
  }
}

export default assetById
