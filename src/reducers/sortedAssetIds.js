import { List } from 'immutable'
import {
  REPLACE_ASSET,
  REPLACE_ASSETS,
} from '../constants'
import {
  getIds,
} from '../macros'


const initialState = List()


const sortedAssetIds = (state=initialState, action) => {
  switch (action.type) {
    case REPLACE_ASSETS: {
      const assets = action.payload
      return state.clear().merge(getIds(assets))
    }
    case REPLACE_ASSET: {
      const asset = action.payload
      const assetId = asset.get('id')
      if (!state.includes(assetId)) {
        return state.insert(0, assetId)
      }
      return state
    }
    default:
      return state
  }
}


export default sortedAssetIds
