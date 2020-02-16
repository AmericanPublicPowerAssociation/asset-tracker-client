import {
  SET_ASSETS,
} from '../constants'
import {
  getByKey,
} from '../macros'

const initialState = {}

const assetTypeByCode = (state = initialState, action) => {
  switch(action.type) {
    case SET_ASSETS: {
      const { assetTypes } = action.payload
      return getByKey(assetTypes, 'code')
    }
    default: {
      return state
    }
  }
}

export default assetTypeByCode
