import produce from 'immer'
import {
  ADD_ASSET_CONNECTION,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
} from '../constants'
import {
  getById,
} from '../macros'

const initialState = {}

const assetById = (state = initialState, action) => {
  switch(action.type) {
    case SET_ASSETS: {
      const assets = action.payload
      return getById(assets, {})
    }
    case SET_ASSET: {
      const asset = action.payload
      const assetId = asset.id
      return produce(state, draft => {
        draft[assetId] = asset
      })
    }
    case SET_ASSET_VALUE: {
      const { assetId, key, value } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        asset[key] = value
      })
    }
    case SET_ASSET_ATTRIBUTE: {
      const { assetId, key, value } = action.payload
      return produce(state, draft => {
        const attributes = draft[assetId].attributes
        attributes[key] = value
      })
    }
    case ADD_ASSET_CONNECTION: {
      const { assetId, busId } = action.payload
      return produce(state, draft => {
        const connections = draft[assetId].connections
        connections.push({busId})
      })
    }
    case SET_ASSET_CONNECTION_ATTRIBUTE: {
      const { assetId, connectionIndex, key, value } = action.payload
      return produce(state, draft => {
        const connections = draft[assetId].connections
        connections[connectionIndex].attributes[key] = value
      })
    }
    default: {
      return state
    }
  }
}

export default assetById
