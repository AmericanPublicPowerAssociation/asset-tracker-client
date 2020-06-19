import {
  DELETE_ASSET,
  SELECTED_ASSET_INDEXES,
  SET_SELECTED_ASSET_INDEXES,
} from '../constants'

export const initialState = SELECTED_ASSET_INDEXES

const selectedAssetIndexes = (state=initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ASSET_INDEXES: {
      return action.payload
    }
    case DELETE_ASSET: {
      return SELECTED_ASSET_INDEXES
    }
    default: {
      return state
    }
  }
}

export default selectedAssetIndexes
