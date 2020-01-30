import produce from 'immer'
import {
  ASSET_BY_ID,
  ADD_ASSET_TO_ASSET_BY_ID,
  MERGE_ASSET,
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
    case MERGE_ASSET: {
      const partialAsset = action.payload
      const { id } = partialAsset
      draft[id] = { ...draft[id], ...partialAsset }
      break
    }
    default: break
  }
}, initialState)

export default assetById
