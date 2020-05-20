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
import {
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
      const {
        assetId,
        selectedAssetVertexIndex,
        largestAssetVertexIndex,
      } = action.payload
      return produce(state, draft => {
        const asset = draft[assetId]
        let connections = asset.connections
        console.log('old connections', JSON.parse(JSON.stringify(draft[assetId]['connections'])))
        if (selectedAssetVertexIndex === 0) {
          delete connections[0]
          const newConnections = Object.entries(connections).reduce( (newConnection, [key, connection]) => {
            newConnection[key - 1] = connection
            return newConnection
          }, {} )

          if (!newConnections[0])
            newConnections[0] = { busId: makeBusId() }
          draft[assetId]['connections'] =  newConnections
        }
        else if (selectedAssetVertexIndex > largestAssetVertexIndex) {
          delete connections[selectedAssetVertexIndex]
          if (!connections[largestAssetVertexIndex])
            connections[largestAssetVertexIndex] = { busId: makeBusId() }
        }
        console.log('new connections', JSON.parse(JSON.stringify(draft[assetId]['connections'])))
      })
    }
    default: {
      return state
    }
  }
}

export default assetById
