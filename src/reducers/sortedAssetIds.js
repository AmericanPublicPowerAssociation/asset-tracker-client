import { OrderedSet } from 'immutable'
import {
  MERGE_ASSETS,
  REPLACE_ASSETS,
} from '../constants'
import {
  getOrderedIds,
} from '../macros'


const initialState = OrderedSet()


const sortedAssetIds = (state=initialState, action) => {
  const actionType = action.type

  if (REPLACE_ASSETS === actionType) {
    const assets = action.payload
    return getOrderedIds(assets)
  } else if (MERGE_ASSETS === actionType) {
    const assets = action.payload
    return state.union(getOrderedIds(assets))
  }

  return state
}


export default sortedAssetIds
