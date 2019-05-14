import { Map } from 'immutable'
import {
  MERGE_ASSETS,
  REPLACE_ASSETS,
} from '../constants'
import {
  getById,
} from '../macros'


const initialState = Map()


const assetById = (state=initialState, action) => {
  const actionType = action.type

  if (REPLACE_ASSETS === actionType) {
    const assets = action.payload
    return getById(assets)
  } else if (MERGE_ASSETS === actionType) {
    const assets = action.payload
    return state.mergeDeep(getById(assets))
  }

  return state
}


export default assetById
