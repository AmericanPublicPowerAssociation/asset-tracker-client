import { Map } from 'immutable'
import {
  CLOSE_ASSET_ADD_DIALOG,
  DEFAULT_ASSET_TYPE_ID,
  OPEN_ASSET_ADD_DIALOG,
  SET_ADDING_ASSET_ERRORS,
  SET_ADDING_ASSET_VALUE,
} from '../constants'


const initialState = Map({
  isOpen: false,
  utilityId: 'abc',  // !!!
  typeId: DEFAULT_ASSET_TYPE_ID,
  name: '',
  errors: Map(),
})


const addingAsset = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ASSET_ADD_DIALOG: {
      return state.set('isOpen', true)
    }
    case CLOSE_ASSET_ADD_DIALOG: {
      return state.set('isOpen', false)
    }
    case SET_ADDING_ASSET_VALUE: {
      return state.merge(action.payload)
    }
    case SET_ADDING_ASSET_ERRORS: {
      return state.set('errors', action.payload)
    }
    default: {
      return state
    }
  }
}


export default addingAsset
