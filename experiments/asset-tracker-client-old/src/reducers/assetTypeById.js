import { OrderedMap } from 'immutable'
import {
  RESET_ASSETS_KIT,
} from '../constants'
import {
  getById,
} from '../macros'


const initialState = OrderedMap()


const assetTypeById = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ASSETS_KIT: {
      const assetTypes = action.payload.get('assetTypes')
      return getById(assetTypes, initialState)
    }
    default: {
      return state
    }
  }
}


export default assetTypeById
