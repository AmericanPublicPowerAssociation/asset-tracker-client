import { combineReducers } from 'redux-immutable'
import reduceReducers from 'reduce-reducers'
import assetById from './assetById'
import assetNameQuery from './assetNameQuery'
import focusingAssetId from './focusingAssetId'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import sortedAssetIds from './sortedAssetIds'


const reduceHorizontally = combineReducers({
  assetById,
  assetNameQuery,
  focusingAssetId,
  selectedAssetTypeIds,
  sortedAssetIds,
})


const reduceVertically = (state, action) => {
  return state
}


export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
