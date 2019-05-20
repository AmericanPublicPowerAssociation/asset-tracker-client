import {
  ADD_ASSET,
  CHANGE_ASSET,
  EXCLUDE_ASSET_FILTER_KEY,
  INCLUDE_ASSET_FILTER_KEY,
  LOG_ERROR,
  REFRESH_ASSETS,
  REPLACE_ASSET,
  REPLACE_ASSETS,
  SET_ASSET_FILTER_KEYS,
  SET_ASSET_FILTER_VALUE,
  SET_FOCUSING_ASSET,
  TOGGLE_ASSET_FILTER_KEY,
} from './constants'


export const logError = payload => ({
  payload, type: LOG_ERROR})


export const refreshAssets = payload => ({
  payload, type: REFRESH_ASSETS})
export const addAsset = payload => ({
  payload, type: ADD_ASSET})
export const changeAsset = payload => ({
  payload, type: CHANGE_ASSET})


export const replaceAsset = payload => ({
  payload, type: REPLACE_ASSET})
export const replaceAssets = payload => ({
  payload, type: REPLACE_ASSETS})


export const excludeAssetFilterKey = payload => ({
  payload, type: EXCLUDE_ASSET_FILTER_KEY})
export const includeAssetFilterKey = payload => ({
  payload, type: INCLUDE_ASSET_FILTER_KEY})
export const setAssetFilterKeys = payload => ({
  payload, type: SET_ASSET_FILTER_KEYS})
export const toggleAssetFilterKey = payload => ({
  payload, type: TOGGLE_ASSET_FILTER_KEY})


export const setFocusingAsset = payload => ({
  payload, type: SET_FOCUSING_ASSET})


export const setAssetFilterValue = payload => ({
  payload, type: SET_ASSET_FILTER_VALUE})
