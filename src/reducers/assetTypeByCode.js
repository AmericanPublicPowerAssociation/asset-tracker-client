// TODO: Review code from scratch

import {
  SET_ASSETS,
} from '../constants'

const initialState = {}

const assetTypeByCode = (state = initialState, action) => {
  switch(action.type) {
    case SET_ASSETS: {
      const { assetTypeByCode } = action.payload
      if (!assetTypeByCode) {
        return state
      }
      return assetTypeByCode
    }
    default: {
      return state
    }
  }
}

export default assetTypeByCode
