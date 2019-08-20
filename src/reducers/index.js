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
import mapViewport from './mapViewport'
import baseMapStyleName from './baseMapStyleName'
import locatingAssetId from './locatingAssetId'
import assetTypeById from './assetTypeById'
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
})


const reduceVertically = (state, action) => {
  switch (action.type) {
    case RESET_ASSETS_KIT: {
      const boundingBox = action.payload.get('boundingBox').toJS()
      const {longitude, latitude, zoom} = new WebMercatorViewport(state.get('mapViewport').toJS())
            .fitBounds(boundingBox, {
              padding: 80,
              offset: [0, -100]
            });
      return state.mergeDeep({
        mapViewport: {longitude, latitude, zoom}
      })
    }
    case SET_FOCUSING_ASSET: {
      const {id} = action.payload
      const assetById = state.get('assetById')
      const focusingAsset = assetById.get(id)
      const coord = focusingAsset.get('location')
      const typeId = focusingAsset.get('typeId')
      if (coord !== undefined ) {
        state = state.mergeDeep({
          mapViewport: {
            longitude: coord.get(0),
            latitude: coord.get(1),
            transitionDuration: 1000,
          }
        })
      }
      return state.mergeDeep({
        assetFilterKeysByAttribute: {typeId: [typeId[0]]},
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
