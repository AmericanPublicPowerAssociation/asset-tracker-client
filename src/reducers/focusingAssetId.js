import {
  SET_FOCUSING_ASSET,
} from '../constants'

const initialState = undefined

const focusingAssetId = (state = initialState, action) => {
  switch(action.type) {
    case SET_FOCUSING_ASSET: {
      const { id } = action.payload
      return id
    }
    default: {
      return state
    }
  }
}

export default focusingAssetId
