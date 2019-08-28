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
import selectedAssetIds from './selectedAssetIds'
import {
  RESET_ASSETS_KIT,
  SET_FOCUSING_ASSET,
} from '../constants'
import { getMapViewport } from '../selectors'


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
  selectedAssetIds,
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
          bounds: action.payload.get('boundingBox')
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
      const focusingAssetId = focusingAsset.get('id')
      const typeId = focusingAsset.get('typeId')
      const selectedAssetIds = state.get('selectedAssetIds')
      const mapViewport = state.get('mapViewport').toJS()
      // Ensure that focusingAssetType is visible
      mergingPatch['assetFilterKeysByAttribute'] = {typeId: [typeId[0]]}
      // Center mapViewport on focusingAsset
      const bounds = getMapViewport(state).get('bounds') 

      if (selectedAssetIds.size > 1) {
        const computeBounds = selectedAssetIds.add(focusingAssetId).reduce( (bounds, currentId) => {
          const location = assetById.get(currentId).get('location')
          if (location) {
            const curLon= location.get(0)
            const curLat = location.get(1)
            if (bounds[0][0] > curLon) { bounds[0][0] = curLon }
            if (bounds[0][1] > curLat) { bounds[0][1] = curLat }
            if (bounds[1][0] < curLon) { bounds[1][0] = curLon }
            if (bounds[1][1] < curLat) { bounds[1][1] = curLat }
          }
          return bounds 
        }, [[Infinity, Infinity], [-Infinity, -Infinity]] )  

        const {
          longitude,
          latitude,
          zoom,
        } = new WebMercatorViewport(
          mapViewport,
        ).fitBounds(computeBounds)
        mergingPatch['mapViewport'] = {
          longitude,
          latitude,
          zoom
        }
      }
      else if (focusingAssetLocation && bounds !== undefined) {
        const [longitude, latitude] = focusingAssetLocation
        const sw_bounds = bounds.get(0)
        const ne_bounds = bounds.get(1)
        const isInBounds = longitude >= sw_bounds.get(0) && 
                           longitude <= ne_bounds.get(0) && 
                           latitude >= sw_bounds.get(1) && 
                           latitude <= ne_bounds.get(1)
        if (!isInBounds) {
          mergingPatch['mapViewport'] = {
            longitude,
            latitude,
            transitionDuration: 1000,}
        }
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
