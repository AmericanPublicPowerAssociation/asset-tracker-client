// TODO: Review code from scratch

import produce from 'immer'
import {
  DELETE_ASSET_CONNECTION,
  DELETE_ASSET_VERTEX,
  INSERT_ASSET_VERTEX,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
} from '../constants'
import {
  getNewConnectionByIndex,
  makeBusId,
} from '../routines'

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
        draft[assetId][key] = value
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
      const { assetId, vertexIndex, connection } = action.payload
      return produce(state, draft => {
        draft[assetId].connections[vertexIndex] = connection
      })
    }
    case DELETE_ASSET_CONNECTION: {
      const { assetId, vertexIndex } = action.payload
      return produce(state, draft => {
        delete draft[assetId].connections[vertexIndex]
      })
    }
    case SET_ASSET_CONNECTION_ATTRIBUTE: {
      const { assetId, assetVertexIndex, key, value } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        const connections = asset.connections
        const attributes = connections[assetVertexIndex].attributes || {}
        attributes[key] = value
      })
    }
    case INSERT_ASSET_VERTEX: {
      const { assetId, afterIndex, connection } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        const indexOffset = 1
        const connectionByIndex = getNewConnectionByIndex(
          asset.connections, afterIndex, indexOffset)
        if (connection) {
          connectionByIndex[afterIndex + 1] = connection
        }
        asset.connections = connectionByIndex
      })
    }
    case DELETE_ASSET_VERTEX: {
      const { assetId, oldVertexIndex, newVertexCount } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        const afterIndex = oldVertexIndex - 1
        const indexOffset = -1
        const connectionByIndex = getNewConnectionByIndex(
          asset.connections, afterIndex, indexOffset)
        // If we are deleting the last endpoint,
        if (oldVertexIndex === newVertexCount) {
          const lastVertexIndex = newVertexCount - 1
          // Make sure the new endpoint has a bus
          if (!connectionByIndex[lastVertexIndex]) {
            connectionByIndex[lastVertexIndex] = { busId: makeBusId() }
          }
        }
        asset.connections = connectionByIndex
      })
    }
    default: {
      return state
    }
  }
}

export default assetById
