import produce from 'immer'
import {
  ADD_ASSET_CONNECTION,
  ASSET_BY_ID,
  MERGE_ASSET,
  SET_ASSET,
  SET_ASSETS,
} from '../constants'

// const initialState = {}
const initialState = ASSET_BY_ID

const assetById = produce((draft, action) => {
  switch(action.type) {
    case SET_ASSET: {
      const asset = action.payload
      const assetId = asset.id
      draft[assetId] = asset
      break
    }
    case ADD_ASSET_CONNECTION: {
      const { assetId, busId } = action.payload
      draft[assetId].connections.push({busId})
      break
    }
    case MERGE_ASSET: {
      const asset = action.payload
      const assetId = asset.id
      draft[assetId] = {...draft[assetId], ...asset}
      break
    }
    case SET_ASSETS: {
      break
    }
    default: { }
  }
}, initialState)

export default assetById
