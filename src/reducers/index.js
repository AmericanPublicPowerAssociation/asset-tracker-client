import { combineReducers } from 'redux-immutable'
import reduceReducers from 'reduce-reducers'
import assetById from './assetById'
import assetNameQuery from './assetNameQuery'
import selectedAssetTypeIds from './selectedAssetTypeIds'
import sortedAssetIds from './sortedAssetIds'


const reduceHorizontally = combineReducers({
  assetById,
  assetNameQuery,
  selectedAssetTypeIds,
  sortedAssetIds,
})


const reduceVertically = (state, action) => {
  // const actionType = action.type
  // const actionPayload = action.payload
  return state
}


export default reduceReducers(
  reduceHorizontally,
  reduceVertically)
