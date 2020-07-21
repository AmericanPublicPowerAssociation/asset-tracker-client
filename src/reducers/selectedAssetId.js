import {
  DELETE_ASSET,
  SELECTED_ASSET_ID,
  SET_ASSETS,
  SET_SELECTED_ASSET_ID,
} from '../constants'

export const initialState = SELECTED_ASSET_ID

const selectedAssetId = (state=initialState, action) => {
  switch(action.type) {
    case SET_SELECTED_ASSET_ID: {
      return action.payload
    }
    case SET_ASSETS: {
      // Keep the same asset selected but using the new id
      const { assetIdById } = action.payload
      const oldAssetId = state
      if (!assetIdById) {
        return oldAssetId
      }
      const newAssetId = assetIdById[oldAssetId]
      return newAssetId || oldAssetId
    }
    case DELETE_ASSET: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default selectedAssetId
