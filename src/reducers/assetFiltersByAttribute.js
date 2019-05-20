import { Map, Set } from 'immutable'
import {
  EXCLUDE_ASSET_ATTRIBUTE_FILTER,
  INCLUDE_ASSET_ATTRIBUTE_FILTER,
  SET_ASSET_ATTRIBUTE_FILTERS,
  TOGGLE_ASSET_ATTRIBUTE_FILTER,
} from '../constants'


const initialState = Map({
  name: Set(),
  typeId: Set(),
})


const assetFiltersByAttribute = (state=initialState, action) => {
  switch (action.type) {
    case SET_ASSET_ATTRIBUTE_FILTERS: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          state.set(attribute, Set(value))
        })
      })
    }
    case INCLUDE_ASSET_ATTRIBUTE_FILTER: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          state.get(attribute).add(value)
        })
      })
    }
    case EXCLUDE_ASSET_ATTRIBUTE_FILTER: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          state.get(attribute).delete(value)
        })
      })
    }
    case TOGGLE_ASSET_ATTRIBUTE_FILTER: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          const attributeFilters = state.get(attribute)
          if (attributeFilters.has(value)) {
            attributeFilters.delete(value)
          } else {
            attributeFilters.add(value)
          }
        })
      })
    }
    default:
      return state
  }
}


export default assetFiltersByAttribute
