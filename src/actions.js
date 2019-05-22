import {
  ADD_ASSET,
  CHANGE_ASSET,
  CLOSE_ASSET_ADD_DIALOG,
  CLOSE_INFORMATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  EXCLUDE_ASSET_FILTER_KEY,
  INCLUDE_ASSET_FILTER_KEY,
  LOG_ERROR,
  OPEN_ASSET_ADD_DIALOG,
  OPEN_INFORMATION_DRAWER,
  OPEN_NAVIGATION_DRAWER,
  REFRESH_ASSETS,
  REPLACE_ASSET,
  REPLACE_ASSET_ERRORS,
  REPLACE_ASSETS,
  SET_ADDING_ASSET_ERRORS,
  SET_ADDING_ASSET_VALUE,
  SET_APP_VALUE,
  SET_ASSET_FILTER_KEYS,
  SET_ASSET_FILTER_VALUE,
  SET_FOCUSING_ASSET,
  SIGN_IN,
  SIGN_OUT,
  TOGGLE_ASSET_FILTER_KEY,
  TOGGLE_THEME,
} from './constants'


export const logError = payload => ({
  payload, type: LOG_ERROR})


export const refreshAssets = payload => ({
  payload, type: REFRESH_ASSETS})
export const addAsset = payload => ({
  payload, type: ADD_ASSET})
export const changeAsset = payload => ({
  payload, type: CHANGE_ASSET})


export const replaceAssets = payload => ({
  payload, type: REPLACE_ASSETS})
export const replaceAsset = payload => ({
  payload, type: REPLACE_ASSET})
export const replaceAssetErrors = payload => ({
  payload, type: REPLACE_ASSET_ERRORS})


export const closeInformationDrawer = payload => ({
  payload, type: CLOSE_INFORMATION_DRAWER})
export const closeNavigationDrawer = payload => ({
  payload, type: CLOSE_NAVIGATION_DRAWER})
export const openInformationDrawer = payload => ({
  payload, type: OPEN_INFORMATION_DRAWER})
export const openNavigationDrawer = payload => ({
  payload, type: OPEN_NAVIGATION_DRAWER})
export const setAppValue = payload => ({
  payload, type: SET_APP_VALUE})
export const toggleTheme = payload => ({
  payload, type: TOGGLE_THEME})


export const setAssetFilterValue = payload => ({
  payload, type: SET_ASSET_FILTER_VALUE})


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


export const openAssetAddDialog = payload => ({
  payload, type: OPEN_ASSET_ADD_DIALOG})
export const closeAssetAddDialog = payload => ({
  payload, type: CLOSE_ASSET_ADD_DIALOG})
export const setAddingAssetValue = payload => ({
  payload, type: SET_ADDING_ASSET_VALUE})
export const setAddingAssetErrors = payload => ({
  payload, type: SET_ADDING_ASSET_ERRORS})


export const signIn = payload => ({
  payload, type: SIGN_IN})
export const signOut = payload => ({
  payload, type: SIGN_OUT})
