// TODO: Consider renaming to selectedAssetId
import {
  DELETE_ASSET,
  SET_ASSETS,
  SET_FOCUSING_ASSET_ID,
} from '../constants'

const initialState = null

const focusingAssetId = (state=initialState, action) => {
  const { payload } = action

  switch(action.type) {
    case SET_FOCUSING_ASSET_ID: {
      const id = payload
      return id
    }
    case SET_ASSETS: {
      // Stay focused on the same asset but using the new id
      const { assetIdById } = payload
      const oldId = state
      if (!assetIdById) {
        return oldId
      }
      const newId = assetIdById[oldId]
      return newId || oldId
    }
    case DELETE_ASSET: {
      return null
    }
    default: {
      return state
    }
  }
}

export default focusingAssetId
