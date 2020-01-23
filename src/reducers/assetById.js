import produce from 'immer'
import {
  ASSET_BY_ID,
  SET_ASSET,
} from '../constants'

const initialState = ASSET_BY_ID

const assetById = produce((draft, action) => {
  switch(action.type) {
    case SET_ASSET: {
      const asset = action.payload
      const id = asset.id
      draft[id] = asset
      break
    }
    default: { }
  }
}, initialState)

export default assetById
