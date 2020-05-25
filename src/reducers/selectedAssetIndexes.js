import {
  DELETE_ASSET,
  SET_SELECTED_ASSET_INDEXES,
} from '../constants'

const initialState = []

const selectedAssetIndexes = (state=initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ASSET_INDEXES: {
      const selectedAssetIndexes = action.payload
      return selectedAssetIndexes
    }
    case DELETE_ASSET: {
      return []
    }
    default: {
      return state
    }
  }
}

export default selectedAssetIndexes
