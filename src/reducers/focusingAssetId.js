import {
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
      const { assetIdById } = payload
      const oldId = state
      if (!assetIdById) {
        return oldId
      }
      const newId = assetIdById[oldId]
      return newId || oldId
    }
    default: {
      return state
    }
  }
}

export default focusingAssetId
