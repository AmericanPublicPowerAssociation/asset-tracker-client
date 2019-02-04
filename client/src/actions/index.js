import {
  ADD_ASSET,
  UPDATE_ASSET,
  ADD_SELECTED_ASSET_TYPE,
  TOGGLE_SELECTED_ASSET_TYPE,
  SET_HIGHLIGHTED_ASSET,
  SET_EXPOSED_ASSET,
  ADD_ASSET_RELATION,
  REMOVE_ASSET_RELATION,
} from '../constants'

export const addAsset = payload => ({
  type: ADD_ASSET, payload})
export const updateAsset = payload => ({
  type: UPDATE_ASSET, payload})

export const addSelectedAssetType = payload => ({
  type: ADD_SELECTED_ASSET_TYPE, payload})
export const toggleSelectedAssetType = payload => ({
  type: TOGGLE_SELECTED_ASSET_TYPE, payload})

export const setHighlightedAsset = payload => ({
  type: SET_HIGHLIGHTED_ASSET, payload})
export const setExposedAsset = payload => ({
  type: SET_EXPOSED_ASSET, payload})

export const addAssetRelation = payload => ({
  type: ADD_ASSET_RELATION, payload})
export const removeAssetRelation = payload => ({
  type: REMOVE_ASSET_RELATION, payload})
