import { Map } from 'immutable'
import {
  SET_ASSET_FILTER_VALUE,
} from '../constants'


const initialState = Map({
  name: '',
})


const assetFilterValueByAttribute= (state=initialState, action) => {
  switch (action.type) {
    case SET_ASSET_FILTER_VALUE: {
      return state.merge(action.payload)
    }
    default:
      return state
  }
}


export default assetFilterValueByAttribute
