import { Map } from 'immutable'
import {
  MERGE_ASSET,
  REPLACE_ASSET,
  REPLACE_ASSETS,
} from '../constants'
import {
  getById,
} from '../macros'


const initialState = Map()


const assetById = (state=initialState, action) => {
  switch (action.type) {
    case MERGE_ASSET: {
      const asset = action.payload
      return state.mergeDeep({[asset.get('id')]: asset})
    }
    case REPLACE_ASSET: {
      const asset = action.payload
      return state.set(asset.get('id'), asset)
    }
    case REPLACE_ASSETS: {
      const assets = action.payload
      return getById(assets)
    }
    default:
      return state
  }
}


export default assetById
