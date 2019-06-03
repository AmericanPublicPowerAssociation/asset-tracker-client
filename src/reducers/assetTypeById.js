import { OrderedMap } from 'immutable'
import {
  RESET_ASSET_TYPES,
} from '../constants'
import {
  getById,
} from '../macros'


const initialState = OrderedMap()


const assetTypeById = (state=initialState, action) => {
  switch (action.type) {
    case RESET_ASSET_TYPES: {
      const assetTypes = action.payload
      return state.withMutations(state => {
        state.clear()
        state.merge(getById(assetTypes, initialState))
      })
    }
    default:
      return state
  }
}


export default assetTypeById
