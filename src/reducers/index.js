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
      if (!boundingBox.length) {
        return state
      }
      const mapViewport = state.get('mapViewport').toJS()
      const {
        longitude,
        latitude,
        zoom,
      } = new WebMercatorViewport(
        mapViewport,
      ).fitBounds(boundingBox)
      return state.mergeDeep({
        mapViewport: {
          longitude,
          latitude,
          zoom,
        },
      })
    }
    case SET_FOCUSING_ASSET: {
      const mergingPatch = {}
      const settingPatch = {}

      const { id } = action.payload
      const assetById = state.get('assetById')
      const focusingAsset = assetById.get(id)
      const focusingAssetLocation = focusingAsset.get('location')
      const typeId = focusingAsset.get('typeId')

      // Ensure that focusingAssetType is visible
      mergingPatch['assetFilterKeysByAttribute'] = {typeId: [typeId[0]]}
      // Center mapViewport on focusingAsset
      if (focusingAssetLocation) {
        const [longitude, latitude] = focusingAssetLocation
        mergingPatch['mapViewport'] = {longitude, latitude}
      }
      // Store a reference copy to track changes
      settingPatch['trackingAsset'] = focusingAsset

      return state.mergeDeep(mergingPatch).merge(settingPatch)
    }
    default: {
      return state
    }
  }
}


export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
