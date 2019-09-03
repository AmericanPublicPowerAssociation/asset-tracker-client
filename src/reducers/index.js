import { combineReducers } from 'redux-immutable'
import reduceReducers from 'reduce-reducers'
import WebMercatorViewport from 'viewport-mercator-project'
import {
  auth,
} from 'appa-auth-consumer'
import {
  productNameSuggestions,
  productVersionSuggestions,
  vendorNameSuggestions,
  vulnerableAssets,
} from 'asset-vulnerability-report'
import app from './app'
import sortedAssetIds from './sortedAssetIds'
import assetById from './assetById'
import focusingAssetId from './focusingAssetId'
import relatingAssetId from './relatingAssetId'
import relatingAssetKey from './relatingAssetKey'
import assetFilterKeysByAttribute from './assetFilterKeysByAttribute'
import assetFilterValueByAttribute from './assetFilterValueByAttribute'
import addingAsset from './addingAsset'
import addingTask from './addingTask'
import mapViewport from './mapViewport'
import baseMapStyleName from './baseMapStyleName'
import locatingAssetId from './locatingAssetId'
import assetTypeById from './assetTypeById'
import assetsLogs from './assetsLogs'
import assetTasks from './assetTasks'
import {
  RESET_ASSETS_KIT,
  SET_FOCUSING_ASSET,
} from '../constants'


const reduceHorizontally = combineReducers({
  app,
  auth,
  sortedAssetIds,
  assetById,
  focusingAssetId,
  relatingAssetId,
  relatingAssetKey,
  addingAsset,
  addingTask,
  assetTasks,
  assetFilterValueByAttribute,
  assetFilterKeysByAttribute,
  trackingAsset: (state = {}) => state,
  vendorNameSuggestions,
  productNameSuggestions,
  productVersionSuggestions,
  vulnerableAssets,
  mapViewport,
  baseMapStyleName,
  locatingAssetId,
  assetTypeById,
  assetsLogs,
})


const reduceVertically = (state, action) => {
  switch (action.type) {
    case RESET_ASSETS_KIT: {
      const boundingBox = action.payload.get('boundingBox').toJS()
      const mapViewport = state.get('mapViewport').toJS()
      const {
        longitude,
        latitude,
        zoom,
      } = new WebMercatorViewport(mapViewport).fitBounds(boundingBox, {
        padding: 24,
        offset: [0, 0],
      })
      return state.mergeDeep({
        mapViewport: {
          longitude,
          latitude,
          zoom,
        },
      })
    }
    case SET_FOCUSING_ASSET: {
      const { id } = action.payload
      const assetById = state.get('assetById')
      const focusingAsset = assetById.get(id)
      const [longitude, latitude] = focusingAsset.get('location')
      const typeId = focusingAsset.get('typeId')
      return state.mergeDeep({
        // Ensure that focusingAssetType is visible
        assetFilterKeysByAttribute: {typeId: [typeId[0]]},
        // Center mapViewport on focusingAsset
        mapViewport: {longitude, latitude},
      }).merge({
        trackingAsset: focusingAsset,
      })
    }
    default: {
      return state
    }
  }
}


export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
