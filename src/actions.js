import {
  ADD_ASSET,
  CHANGE_ASSET,
  EXCLUDE_ASSET_ATTRIBUTE_FILTER,
  INCLUDE_ASSET_ATTRIBUTE_FILTER,
  LOG_ERROR,
  REFRESH_ASSETS,
  REPLACE_ASSET,
  REPLACE_ASSETS,
  SET_ASSET_ATTRIBUTE_FILTERS,
  SET_ASSET_FILTER,
  SET_FOCUSING_ASSET,
  TOGGLE_ASSET_ATTRIBUTE_FILTER,
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


export const excludeAssetAttributeFilter = payload => ({
  payload, type: EXCLUDE_ASSET_ATTRIBUTE_FILTER})
export const includeAssetAttributeFilter = payload => ({
  payload, type: INCLUDE_ASSET_ATTRIBUTE_FILTER})
export const setAssetAttributeFilters = payload => ({
  payload, type: SET_ASSET_ATTRIBUTE_FILTERS})
export const toggleAssetAttributeFilter = payload => ({
  payload, type: TOGGLE_ASSET_ATTRIBUTE_FILTER})


export const setFocusingAsset = payload => ({
  payload, type: SET_FOCUSING_ASSET})


export const setAssetFilter = payload => ({
  payload, type: SET_ASSET_FILTER})
