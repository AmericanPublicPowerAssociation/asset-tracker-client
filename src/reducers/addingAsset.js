import { Map } from 'immutable'
import {
    CLOSE_ASSET_ADD_DIALOG,
    CLOSE_ASSETS_UPLOAD_DIALOG,
    DEFAULT_ASSET_TYPE_ID,
    OPEN_ASSET_ADD_DIALOG,
    OPEN_ASSETS_UPLOAD_DIALOG,
    SET_ADDING_ASSET_ERRORS,
    SET_ADDING_ASSET_VALUE,
    SET_ASSET_CSV_FILE,
} from '../constants'


const initialState = Map({
  isOpen: false,
  utilityId: 'abc',  // !!!
  typeId: DEFAULT_ASSET_TYPE_ID,
  name: '',
  errors: Map(),
  uploaderIsOpen: false

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
    case OPEN_ASSETS_UPLOAD_DIALOG: {
        return state.set('uploaderIsOpen', true)
    }
    case CLOSE_ASSETS_UPLOAD_DIALOG: {
        return state.set('uploaderIsOpen', false)
    }
    case SET_ASSET_CSV_FILE: {
        if (typeof action.payload === 'object' && action.payload.length > 0) {
            return state.set('assetCSVFile', action.payload[0])
        }
        return state.set('assetCSVFile', null)
    }
    default: {
      return state
    }
  }
}


export default addingAsset
