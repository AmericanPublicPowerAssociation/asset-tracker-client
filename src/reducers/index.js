import { combineReducers } from 'redux-immutable'
import reduceReducers from 'reduce-reducers'
import assetById from './assetById'
import sortedAssetIds from './sortedAssetIds'
import focusingAssetId from './focusingAssetId'
import assetFilterKeysByAttribute from './assetFilterKeysByAttribute'
import assetFilterValueByAttribute from './assetFilterValueByAttribute'
import addingAsset from './addingAsset'
import app from './app'
import {
  SET_FOCUSING_ASSET,
} from '../constants'


const reduceHorizontally = combineReducers({
  app,
  sortedAssetIds,
  assetById,
  focusingAssetId,
  assetFilterValueByAttribute,
  assetFilterKeysByAttribute,
  addingAsset,
  trackingAsset: (state={}) => state,
})


const reduceVertically = (state, action) => {
  switch (action.type) {
    case SET_FOCUSING_ASSET: {
      const {id} = action.payload
      const assetById = state.get('assetById')
      const focusingAsset = assetById.get(id)
      return state.set('trackingAsset', focusingAsset)
    }
    default:
      return state
  }
}


export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
