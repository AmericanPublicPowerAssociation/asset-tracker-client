import { combineReducers } from 'redux-immutable'
import reduceReducers from 'reduce-reducers'
import assetById from './assetById'
import sortedAssetIds from './sortedAssetIds'
import focusingAssetId from './focusingAssetId'
import assetFiltersByAttribute from './assetFiltersByAttribute'
import assetFilter from './assetFilter'
// import assetAddDialog from './assetAddDialog'
import {
  SET_FOCUSING_ASSET,
} from '../constants'


const reduceHorizontally = combineReducers({
  // Remember assets
  sortedAssetIds,
  assetById,
  focusingAssetId,
  // Remember filters
  assetFiltersByAttribute,
  // Remember components
  assetFilter,
  // assetAddDialog,
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
