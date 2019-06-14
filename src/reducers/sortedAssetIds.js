import { List } from 'immutable'
import {
  RESET_ASSETS,
  SET_ASSET,
  SET_ASSETS,
} from '../constants'
import {
  getIds,
} from '../macros'


const initialState = List()


const sortedAssetIds = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ASSETS: {
      const assets = action.payload
      return getIds(assets)
    }
    case SET_ASSETS: {
      const assets = action.payload
      return state.withMutations(state => {
        for (const asset of assets) {
          const id = asset.get('id')
          if (!state.includes(id)) {
            state.push(id)
          }
        }
      })
    }
    case SET_ASSET: {
      const asset = action.payload
      const id = asset.get('id')
      if (!state.includes(id)) {
        return state.insert(0, id)
      }
      return state
    }
    default: {
      return state
    }
  }
}


export default sortedAssetIds
