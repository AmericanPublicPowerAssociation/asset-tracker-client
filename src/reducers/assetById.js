import { Map } from 'immutable'
import {
  REPLACE_ASSET,
  REPLACE_ASSETS,
  REPLACE_ASSET_ERRORS,
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
      const id = asset.get('id')
      return state.set(id, asset)
    }
    case REPLACE_ASSET_ERRORS: {
      const asset = action.payload
      const id = asset.get('id')
      const errors = asset.get('errors')
      return state.update(id, asset => asset.set('errors', errors))
    }
    default:
      return state
  }
}


export default assetById
