import {
  SET_FOCUSING_ASSET_ID,
} from '../constants'

const initialState = null

const focusingAssetId = (state=initialState, action) => {
  switch(action.type) {
    case SET_FOCUSING_ASSET_ID: {
      const id = action.payload
      return id
    }
    default: {
      return state
    }
  }
}

export default focusingAssetId
