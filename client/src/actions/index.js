import {
  ADD_ASSET,
  UPDATE_ASSET,
  HIGHLIGHT_ASSET,
  ADD_SELECTED_ASSET_TYPE,
  REMOVE_SELECTED_ASSET_TYPE,
  TOGGLE_SELECTED_ASSET_TYPE,
  SET_SELECTED_ASSET_TYPES,
} from '../constants'

export const addAsset = asset => ({
  type: ADD_ASSET, asset})

export const updateAsset = asset => ({
  type: UPDATE_ASSET, asset})

export const highlightAsset = assetId => ({
  type: HIGHLIGHT_ASSET, assetId})

export const addSelectedAssetType = assetTypeId => ({
  type: ADD_SELECTED_ASSET_TYPE, assetTypeId})

export const removeSelectedAssetType = assetTypeId => ({
  type: REMOVE_SELECTED_ASSET_TYPE, assetTypeId})

export const toggleSelectedAssetType = assetTypeId => ({
  type: TOGGLE_SELECTED_ASSET_TYPE, assetTypeId})

export const setSelectedAssetTypes = assetTypeIds => ({
  type: SET_SELECTED_ASSET_TYPES, assetTypeIds})
