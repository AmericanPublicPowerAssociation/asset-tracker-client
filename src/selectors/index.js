import { createSelector } from 'reselect'
import {
  MAXIMUM_ASSET_LIST_LENGTH,
} from '../constants'
import {
  splitTerms,
} from '../macros'


const getAssetById = state => state.get('assetById')
const getAssetNameQuery = state => state.get('assetNameQuery')
const getSortedAssetIds = state => state.get('sortedAssetIds')


export const getVisibleAssets = createSelector([
  getAssetById,
  getAssetNameQuery,
  getSortedAssetIds,
], (
  assetById,
  assetNameQuery,
  sortedAssetIds,
) => {
  const lowercaseQueryTerms = splitTerms(assetNameQuery.toLowerCase())
  return sortedAssetIds
    .map(assetId => assetById.get(assetId))
    .filter(asset => {
      const lowercaseAssetName = asset.get('name').toLowerCase()
      return lowercaseQueryTerms.every(
        term => lowercaseAssetName.includes(term))
    })
    .slice(0, MAXIMUM_ASSET_LIST_LENGTH)
})
