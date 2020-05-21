import produce from 'immer'
import {
  DELETE_ASSET,
  DELETE_ASSET_VERTEX,
  INSERT_ASSET_VERTEX,
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
    case INSERT_ASSET_VERTEX: {
      const {
        assetId,
        assetVertexIndex,
        connection,
      } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        const connectionByIndex = asset.connections
        for (const [oldIndex, oldConnection] of Object.entries(connectionByIndex)) {
          console.log('XXX', oldIndex, oldIndex + 1)
          const newIndex = oldIndex > assetVertexIndex ?
            parseInt(oldIndex) + 1 : oldIndex
          connectionByIndex[newIndex] = oldConnection
        }
        connectionByIndex[assetVertexIndex + 1] = connection
        asset.connections = connectionByIndex
      })
    }
    case DELETE_ASSET_VERTEX: {
      const {
        assetId,
      } = action.payload
      break
    }
    case REMOVE_LINE_END_POINT: {
      const {
        assetId,
        assetVertexIndex,
        largestAssetVertexIndex } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        const connections = asset.connections
        if (assetVertexIndex === 0) {
          delete connections[0]
          for (const [index, connection] of Object.entries(connections))
            connections[index-1] = connection

          if (!connections[0]) connections[0] = ''
          delete connections[largestAssetVertexIndex]
        }
        else if (assetVertexIndex === largestAssetVertexIndex) {
          delete connections[largestAssetVertexIndex]
          connections[largestAssetVertexIndex-1] = ''
        }
      })
    }
    default: {
      return state
    }
  }
}

export default assetById
