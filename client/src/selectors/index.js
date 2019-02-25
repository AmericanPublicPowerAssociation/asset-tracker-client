import { createSelector } from 'reselect'
import { Map } from 'immutable'
import {
  ASSET_TYPE_BY_ID,
  MAXIMUM_LIST_LENGTH,
} from '../constants'

const getAssetById = state => state.assetById
const getSortedAssetIds = state => state.sortedAssetIds
const getSelectedAssetTypeIds = state => state.selectedAssetTypeIds
const getHighlightedAssetId = state => state.highlightedAssetId
const getExposedAssetId = state => state.exposedAssetId
const getExposedAssetKey = state => state.exposedAssetKey

export const getVisibleAssets = createSelector(
  [getAssetById, getSortedAssetIds, getSelectedAssetTypeIds],
  (assetById, sortedAssetIds, selectedAssetTypeIds) => sortedAssetIds
    .slice(0, MAXIMUM_LIST_LENGTH)
    .map(assetId => assetById.get(assetId))
    .filter(asset => selectedAssetTypeIds.includes(asset.get('typeId'))))

export const getHighlightedAsset = createSelector(
  [getAssetById, getHighlightedAssetId],
  (assetById, highlightedAssetId) => assetById.get(highlightedAssetId, Map()))

export const getExposedAsset = createSelector(
  [getAssetById, getExposedAssetId],
  (assetById, exposedAssetId) => assetById.get(exposedAssetId, Map()))

export const getExposedAssetTypeIds = createSelector(
  [getExposedAsset, getExposedAssetKey],
  (exposedAsset, exposedAssetKey) => exposedAsset.get('typeId') ?
    ASSET_TYPE_BY_ID[exposedAsset.get('typeId')][exposedAssetKey] :
    [])
