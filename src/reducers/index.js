import { combineReducers } from 'redux-immutable'
import reduceReducers from 'reduce-reducers'
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
import assetLocationById from './assetLocationById'
import {
  SET_FOCUSING_ASSET,
} from '../constants'


const reduceHorizontally = combineReducers({
  app,
  sortedAssetIds,
  assetById,
  focusingAssetId,
  relatingAssetId,
  relatingAssetKey,
  addingAsset,
  assetFilterValueByAttribute,
  assetFilterKeysByAttribute,
  trackingAsset: (state={}) => state,
  vendorNameSuggestions,
  productNameSuggestions,
  productVersionSuggestions,
  vulnerableAssets,
  mapViewport,
  baseMapStyleName,
  locatingAssetId,
  assetLocationById,
})


const reduceVertically = (state, action) => {
  switch (action.type) {
    case SET_FOCUSING_ASSET: {
      const {id} = action.payload
      const assetById = state.get('assetById')
      const focusingAsset = assetById.get(id)
      const typeId = focusingAsset.get('typeId')
      return state.mergeDeep({
        assetFilterKeysByAttribute: {typeId: [typeId[0]]},
      }).merge({
        trackingAsset: focusingAsset,
      })
    }
    default:
      return state
  }
}


export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
