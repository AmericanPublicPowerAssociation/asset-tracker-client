import { OrderedSet } from 'immutable'
import {
  REPLACE_ASSET,
  REPLACE_ASSETS,
} from '../constants'
import {
  getOrderedIds,
} from '../macros'


const initialState = OrderedSet()


const sortedAssetIds = (state=initialState, action) => {
  switch (action.type) {
    case REPLACE_ASSET: {
      const asset = action.payload
      return state.add(asset.get('id'))
    }
    case REPLACE_ASSETS: {
      const assets = action.payload
      return getOrderedIds(assets)
    }
    default:
      return state
  }
}


export default sortedAssetIds
