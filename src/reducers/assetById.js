import produce from 'immer'
import {
  DELETE_ASSET,
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
      const { assetId, assetIdsByBusId } = action.payload
      const assetConnection = state[assetId].connections
      const assetBusIds = Object.entries(assetConnection).map( ([key, bus]) => bus.busId)
      console.log('********', assetId, assetIdsByBusId, assetBusIds)
      return produce(state, draft => {
        for (const assetBusId of assetBusIds) {
          const connectedAssetsToBusId = assetIdsByBusId[assetBusId]
          for (const connectedAssetId of connectedAssetsToBusId) {
            const connectedAsset = draft[connectedAssetId]
            if (connectedAsset.typeCode !== 'l') continue
            // remove connections from lines only
            const connectedAssetConnections = connectedAsset.connections
            const connectedAssetConnection = Object.entries(connectedAssetConnections).find( ([key, connection]) => connection.busId === assetBusId)
            if (connectedAssetConnection) {
              const [index, connection] = connectedAssetConnection
              delete connectedAssetConnections[index]
            }
            console.log(JSON.stringify(connectedAssetConnections))
          }
        }
        draft[assetId]['is_deleted'] = true
      })
    }
    default: {
      return state
    }
  }
}

export default assetById
