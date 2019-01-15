import { combineReducers } from 'redux'

import assets from './assets'
import selectedAsset from './selectedAsset'
import editMode from './editMode'


export default combineReducers({
  assets,
  selectedAsset,
  editMode,
})
