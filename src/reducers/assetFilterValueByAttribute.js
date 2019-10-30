import { Map } from 'immutable'
import {
  SET_ASSET_FILTER_VALUES,
  DESELECT_EVERYTHING,
} from '../constants'


const initialState = Map({
  name: '',
})


const assetFilterValueByAttribute = (state = initialState, action) => {
  switch (action.type) {
    case SET_ASSET_FILTER_VALUES: {
      return state.merge(action.payload)
    }
    case DESELECT_EVERYTHING: {
      return initialState
    }
    default: {
      return state
    }
  }
}


export default assetFilterValueByAttribute
