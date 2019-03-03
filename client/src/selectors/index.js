import { createSelector } from 'reselect'
import {
  Map,
  List,
} from 'immutable'
import {
  ASSET_TYPE_BY_ID,
  MAXIMUM_LIST_LENGTH,
} from '../constants'

const getAssetById = state => state.assetById
const getSortedAssetIds = state => state.sortedAssetIds
const getSelectedAssetTypeIds = state => state.selectedAssetTypeIds
const getFocusingAssetId = state => state.focusingAssetId
const getLocatingAssetId = state => state.locatingAssetId
const getRelatingAssetId = state => state.relatingAssetId
const getRelatingAssetKey = state => state.relatingAssetKey

export const getFocusingAsset = createSelector(
  [getAssetById, getFocusingAssetId],
  (assetById, focusingAssetId) => assetById.get(focusingAssetId, Map()))

export const getLocatingAsset = createSelector(
  [getAssetById, getLocatingAssetId],
  (assetById, locatingAssetId) => assetById.get(locatingAssetId, Map()))

export const getRelatingAsset = createSelector(
  [getAssetById, getRelatingAssetId],
  (assetById, relatingAssetId) => assetById.get(relatingAssetId, Map()))

export const getConnectedAssets = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get(
    'connectedIds', List()).map(assetId => assetById.get(assetId)))

export const getParentAssets = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get(
    'parentIds', List()).map(assetId => assetById.get(assetId)))

export const getChildAssets = createSelector(
  [getAssetById, getFocusingAsset],
  (assetById, focusingAsset) => focusingAsset.get(
    'childIds', List()).map(assetId => assetById.get(assetId)))

export const getVisibleAssets = createSelector(
  [getAssetById, getSortedAssetIds, getSelectedAssetTypeIds],
  (assetById, sortedAssetIds, selectedAssetTypeIds) => sortedAssetIds
    .slice(0, MAXIMUM_LIST_LENGTH)
    .map(assetId => assetById.get(assetId))
    .filter(asset => selectedAssetTypeIds.includes(asset.get('typeId'))))

export const getRelatedAssetTypeIds = createSelector(
  [getRelatingAsset, getRelatingAssetKey],
  (relatingAsset, relatingAssetKey) => relatingAsset.get('typeId') ?
    ASSET_TYPE_BY_ID[relatingAsset.get('typeId')][relatingAssetKey] :
    [])

export const getRelatedAssetIds = createSelector(
  [getRelatingAsset, getRelatingAssetKey],
  (relatingAsset, relatingAssetKey) => relatingAsset.get(relatingAssetKey, []))
