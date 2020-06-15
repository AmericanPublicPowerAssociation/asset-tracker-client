import {
  DELETE_ASSET,
  SET_ASSETS,
  SET_SELECTED_ASSET_ID,
} from '../constants'

const initialState = null

const selectedAssetId = (state=initialState, action) => {
  switch(action.type) {
    case SET_SELECTED_ASSET_ID: {
      const assetId = action.payload
      return assetId
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
      return null
    }
    default: {
      return state
    }
  }
}

export default selectedAssetId
