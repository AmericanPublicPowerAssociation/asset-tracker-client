import {
  ADD_ASSET,
  ADD_SELECTED_ASSET_TYPE,
  CHANGE_ASSET,
  MERGE_ASSET,
  REFRESH_ASSETS,
  REPLACE_ASSET,
  REPLACE_ASSETS,
  SERVER,
  SET_ASSET_NAME_QUERY,
  SET_FOCUSING_ASSET,
  TOGGLE_SELECTED_ASSET_TYPE,
} from '../constants'


export const refreshAssets = (payload, callback) => ({
  payload, callback, api: SERVER, type: REFRESH_ASSETS})
export const addAsset = (payload, callback) => ({
  payload, callback, api: SERVER, type: ADD_ASSET})
export const changeAsset = (payload, callback) => ({
  payload, callback, api: SERVER, type: CHANGE_ASSET})


export const mergeAsset = payload => ({
  payload, type: MERGE_ASSET})
export const replaceAsset = payload => ({
  payload, type: REPLACE_ASSET})
export const replaceAssets = payload => ({
  payload, type: REPLACE_ASSETS})


export const setAssetNameQuery = payload => ({
  payload, type: SET_ASSET_NAME_QUERY})
export const toggleSelectedAssetType = payload => ({
  payload, type: TOGGLE_SELECTED_ASSET_TYPE})
export const addSelectedAssetType = payload => ({
  payload, type: ADD_SELECTED_ASSET_TYPE})


export const setFocusingAsset = payload => ({
  payload, type: SET_FOCUSING_ASSET})
