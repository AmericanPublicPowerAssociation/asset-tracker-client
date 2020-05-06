import {
  SET_SELECTED_ASSET_INDEXES,
} from '../constants'

const initialState = []

const selectedAssetIndexes = (state=initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ASSET_INDEXES: {
      const selectedAssetIndexes = action.payload
      return selectedAssetIndexes
    }
    default: {
      return state
    }
  }
}

export default selectedAssetIndexes
