import produce from 'immer'
import {
  ASSET_BY_ID,
  ADD_ASSET_TO_ASSET_BY_ID,
} from '../constants'

const initialState = ASSET_BY_ID

const assetById = produce((draft, action) => {
  switch(action.type) {
    case ADD_ASSET_TO_ASSET_BY_ID: {
      const {_id, type, name} = action.payload
      const busByIndex = []
      draft[_id] = {
        id: _id.toString(),
        type,
        name,
      }
      break
    }
    default: break
  }
}, initialState)

export default assetById
