import produce from 'immer'
import {
  DELETE_ASSET,
  REMOVE_LINE_END_POINT,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
} from '../constants'

const initialState = {}

const assetById = (state = initialState, action) => {
  switch(action.type) {
    case SET_ASSETS: {
      const { assetById } = action.payload
      return assetById
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
        const asset = draft[assetId]
        let attributes = asset.attributes
        if (attributes === undefined) {
          attributes = asset.attributes = {}
        }
        attributes[key] = value
      })
    }
    case SET_ASSET_CONNECTION: {
      const { assetId, assetVertexIndex, connection } = action.payload
      return produce(state, draft => {
        draft[assetId].connections[assetVertexIndex] = connection
      })
    }
    case SET_ASSET_CONNECTION_ATTRIBUTE: {
      const { assetId, assetVertexIndex, key, value } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        const connections = asset.connections
        const attributes = connections[assetVertexIndex].attributes
        attributes[key] = value
      })
    }
    case DELETE_ASSET: {
      const { assetId } = action.payload
      return produce(state, draft => {
        draft[assetId]['is_deleted'] = true
      })
    }
    case REMOVE_LINE_END_POINT: {
      const { assetId, assetVertexIndex, connection } = action.payload
      return produce(state, draft => {
        if (assetVertexIndex !== 0)
          draft[assetId].connections[assetVertexIndex] = connection
        else {
          const asset =  draft[assetId]
          const connections = asset.connections
          for (const [index, connection] of Object.entries(connections)) {
            if (index === 0 ) continue
            connections[index-1] = connection
          }
        }
      })
    }
    default: {
      return state
    }
  }
}

export default assetById
