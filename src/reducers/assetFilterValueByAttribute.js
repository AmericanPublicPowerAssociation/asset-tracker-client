import { Map } from 'immutable'
import {
  SET_ASSET_FILTER_VALUES,
} from '../constants'


const initialState = Map({
  name: '',
})


const assetFilterValueByAttribute = (state = initialState, action) => {
  switch (action.type) {
    case SET_ASSET_FILTER_VALUES: {
      return state.merge(action.payload)
    }
    default: {
      return state
    }
  }
}


export default assetFilterValueByAttribute
