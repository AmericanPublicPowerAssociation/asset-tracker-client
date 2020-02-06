import produce from 'immer'
import {
  ADD_ASSET_CONNECTION,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION_ATTRIBUTE,
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
    case SET_ASSET_ATTRIBUTE: {
      const {
        assetId,
        key,
        val
      } = action.payload
      draft[assetId][key] = val
      break
    }
    case SET_ASSET_CONNECTION_ATTRIBUTE: {
      const {
        assetId,
        connIndex,
        key,
        val
      } = action.payload
      const conn = draft[assetId]["connections"]
      conn[connIndex].attributes[key] = val
      break
    }
    default: { }
  }
}, initialState)

export default assetById
