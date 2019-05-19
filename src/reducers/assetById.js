import { Map } from 'immutable'
import {
  REPLACE_ASSET,
  REPLACE_ASSETS,
} from '../constants'
import {
  getById,
} from '../macros'


const initialState = Map()


const assetById = (state=initialState, action) => {
  switch (action.type) {
    case REPLACE_ASSETS: {
      const assets = action.payload
      return getById(assets)
    }
    case REPLACE_ASSET: {
      const asset = action.payload
      return state.set(asset.get('id'), asset)
    }
    default:
      return state
  }
}


export default assetById
