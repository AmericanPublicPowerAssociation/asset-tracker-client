import {
  ADD_ASSET,
  UPDATE_ASSET,
  ADD_SELECTED_ASSET_TYPE,
  TOGGLE_SELECTED_ASSET_TYPE,
  SET_FOCUSING_ASSET,
  SET_RELATING_ASSET,
  SET_LOCATING_ASSET,
  TOGGLE_ASSET_RELATION,
} from '../constants'

export const addAsset = payload => ({
  type: ADD_ASSET, payload})
export const updateAsset = payload => ({
  type: UPDATE_ASSET, payload})

export const addSelectedAssetType = payload => ({
  type: ADD_SELECTED_ASSET_TYPE, payload})
export const toggleSelectedAssetType = payload => ({
  type: TOGGLE_SELECTED_ASSET_TYPE, payload})

export const setFocusingAsset = payload => ({
  type: SET_FOCUSING_ASSET, payload})
export const setRelatingAsset = payload => ({
  type: SET_RELATING_ASSET, payload})
export const setLocatingAsset = payload => ({
  type: SET_LOCATING_ASSET, payload})

export const toggleAssetRelation = payload => ({
  type: TOGGLE_ASSET_RELATION, payload})
