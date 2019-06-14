import {
  ADD_ASSET,
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  CLOSE_ASSET_ADD_DIALOG,
  CLOSE_INFORMATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  DROP_ASSET_RELATION,
  EXCLUDE_ASSET_FILTER_KEY,
  EXCLUDE_ASSET_RELATION,
  INCLUDE_ASSET_FILTER_KEY,
  INCLUDE_ASSET_RELATION,
  LOG_ERROR,
  MERGE_ASSET,
  OPEN_ASSET_ADD_DIALOG,
  OPEN_INFORMATION_DRAWER,
  OPEN_NAVIGATION_DRAWER,
  REFRESH_ASSETS,
  REFRESH_ASSET_TYPES,
  RESET_ASSETS,
  RESET_ASSET_TYPES,
  SET_ADDING_ASSET_ERRORS,
  SET_ADDING_ASSET_VALUE,
  SET_APP_VALUE,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSET_ERRORS,
  SET_ASSET_FILTER_KEYS,
  SET_ASSET_FILTER_VALUE,
  SET_ASSET_LOCATION,
  SET_FOCUSING_ASSET,
  SET_LOCATING_ASSET,
  SET_MAP_VIEWPORT,
  SET_RELATING_ASSET,
  TOGGLE_ASSET_FILTER_KEY,
  TOGGLE_THEME,
} from './constants'


export const logError = payload => ({
  payload, type: LOG_ERROR})


export const refreshAssetTypes = payload => ({
  payload, type: REFRESH_ASSET_TYPES})
export const refreshAssets = payload => ({
  payload, type: REFRESH_ASSETS})
export const addAsset = payload => ({
  payload, type: ADD_ASSET})
export const changeAsset = payload => ({
  payload, type: CHANGE_ASSET})


export const addAssetRelation = payload => ({
  payload, type: ADD_ASSET_RELATION})
export const dropAssetRelation = payload => ({
  payload, type: DROP_ASSET_RELATION})


export const resetAssetTypes = payload => ({
  payload, type: RESET_ASSET_TYPES})
export const resetAssets = payload => ({
  payload, type: RESET_ASSETS})
export const setAssets = payload => ({
  payload, type: SET_ASSETS})
export const setAsset = payload => ({
  payload, type: SET_ASSET})
export const mergeAsset = payload => ({
  payload, type: MERGE_ASSET})
export const setAssetErrors = payload => ({
  payload, type: SET_ASSET_ERRORS})
export const setAssetLocation = payload => ({
  payload, type: SET_ASSET_LOCATION})


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


export const excludeAssetRelation = payload => ({
  payload, type: EXCLUDE_ASSET_RELATION})
export const includeAssetRelation = payload => ({
  payload, type: INCLUDE_ASSET_RELATION})


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
export const setRelatingAsset = payload => ({
  payload, type: SET_RELATING_ASSET})
export const setLocatingAsset = payload => ({
  payload, type: SET_LOCATING_ASSET})


export const openAssetAddDialog = payload => ({
  payload, type: OPEN_ASSET_ADD_DIALOG})
export const closeAssetAddDialog = payload => ({
  payload, type: CLOSE_ASSET_ADD_DIALOG})
export const setAddingAssetValue = payload => ({
  payload, type: SET_ADDING_ASSET_VALUE})
export const setAddingAssetErrors = payload => ({
  payload, type: SET_ADDING_ASSET_ERRORS})


export const setMapViewport = payload => ({
  type: SET_MAP_VIEWPORT, payload})
