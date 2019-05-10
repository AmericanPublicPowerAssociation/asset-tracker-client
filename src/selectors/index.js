import { createSelector } from 'reselect'
import {
  MAXIMUM_ASSET_LIST_LENGTH,
} from '../constants'


const getAssetById = state => state.get('assetById')
const getSortedAssetIds = state => state.get('sortedAssetIds')


export const getVisibleAssets = createSelector([
  getAssetById,
  getSortedAssetIds,
], (
  assetById,
  sortedAssetIds,
) => {
  return sortedAssetIds
    .map(assetId => assetById.get(assetId))
    .slice(0, MAXIMUM_ASSET_LIST_LENGTH)
})
