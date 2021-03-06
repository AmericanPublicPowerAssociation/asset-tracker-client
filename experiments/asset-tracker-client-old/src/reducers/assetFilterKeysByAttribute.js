import { Map, Set } from 'immutable'
import {
  EXCLUDE_ASSET_FILTER_KEY,
  INCLUDE_ASSET_FILTER_KEY,
  SELECTED_ASSET_TYPE_IDS,
  SET_ASSET_FILTER_KEYS,
  TOGGLE_ASSET_FILTER_KEY,
  DESELECT_EVERYTHING,
} from '../constants'


const initialState = Map({
  typeId: Set(SELECTED_ASSET_TYPE_IDS),
})


const assetFilterKeysByAttribute = (state = initialState, action) => {
  switch (action.type) {
    case SET_ASSET_FILTER_KEYS: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          state.set(attribute, Set(value))
        })
      })
    }
    case INCLUDE_ASSET_FILTER_KEY: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          state.update(attribute, set => set.add(value))
        })
      })
    }
    case EXCLUDE_ASSET_FILTER_KEY: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          state.update(attribute, set => set.delete(value))
        })
      })
    }
    case TOGGLE_ASSET_FILTER_KEY: {
      return state.withMutations(state => {
        Object.entries(action.payload).forEach(([attribute, value]) => {
          state.update(attribute, set => set.has(value) ?
            set.delete(value) :
            set.add(value))
        })
      })
    }
    case DESELECT_EVERYTHING: {
      return Map({
        typeId: Set([]),
      })

    }
    default: {
      return state
    }
  }
}


export default assetFilterKeysByAttribute
