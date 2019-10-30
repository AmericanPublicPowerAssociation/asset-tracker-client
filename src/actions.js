import {
  ADD_ASSET,
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  CLOSE_ASSETS_UPLOAD_DIALOG,
  CLOSE_ASSET_ADD_DIALOG,
  CLOSE_INFORMATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  CLOSE_TASK_EDIT_DIALOG,
  DOWNLOAD_ASSETS_CSV,
  DOWNLOAD_ASSETS_DSS,
  DROP_ASSET_RELATION,
  EDIT_TASK,
  EXCLUDE_ASSET_FILTER_KEY,
  EXCLUDE_ASSET_RELATION,
  HIDE_ADDING_CSV_ASSETS_ERRORS,
  INCLUDE_ASSET_FILTER_KEY,
  INCLUDE_ASSET_RELATION,
  LOG_ERROR,
  MERGE_ASSET,
  OPEN_ASSETS_UPLOAD_DIALOG,
  OPEN_ASSET_ADD_DIALOG,
  OPEN_INFORMATION_DRAWER,
  OPEN_NAVIGATION_DRAWER,
  OPEN_TASK_EDIT_DIALOG,
  REFRESH_ASSETS_KIT,
  REFRESH_ASSET_TASKS,
  REFRESH_DASHBOARDS,
  REFRESH_LOGS,
  REFRESH_TASKS,
  RESET_ASSETS_KIT,
  RESET_ASSET_TASKS,
  RESET_DASHBOARDS,
  RESET_LOGS,
  RESET_TASKS,
  SET_ADDING_ASSET_ERRORS,
  SET_ADDING_ASSET_VALUES,
  SET_ADDING_CSV_ASSETS_ERRORS,
  SET_APP_VALUES,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSET_CSV_FILE,
  SET_ASSET_ERRORS,
  SET_ASSET_FILTER_KEYS,
  SET_ASSET_FILTER_VALUES,
  SET_ASSET_LOCATION,
  SET_EDITING_TASK_ERRORS,
  SET_EDITING_TASK_VALUES,
  SET_FOCUSING_ASSET,
  SET_LOCATING_ASSET,
  SET_SELECTED_ASSET,
  DESELECT_EVERYTHING,
  SET_MAP_VIEWPORT,
  SET_BASE_MAP_STYLE_NAME,
  SET_RELATING_ASSET,
  SET_SORTED_ASSETS,
  SET_TASK,
  TOGGLE_ASSET_FILTER_KEY,
  TOGGLE_SELECTED_ASSET,
  TOGGLE_THEME,
  UPLOAD_ASSETS_CSV,
  SET_OVERWRITE_ASSETS,
} from './constants'


export const logError = payload => ({
  payload, type: LOG_ERROR})


export const refreshDashboards = payload => ({
  payload, type: REFRESH_DASHBOARDS})
export const refreshAssetsKit = payload => {
  if (!payload){
    payload = {}
  }
  return {payload, type: REFRESH_ASSETS_KIT}
}
export const refreshLogs = payload => ({
  payload, type: REFRESH_LOGS})
export const addAsset = payload => ({
  payload, type: ADD_ASSET})
export const changeAsset = payload => ({
  payload, type: CHANGE_ASSET})


export const refreshAssetTasks = payload => ({
  payload, type: REFRESH_ASSET_TASKS})
export const refreshTasks = payload => ({
  payload, type: REFRESH_TASKS})
export const editTask = payload => ({
  payload, type: EDIT_TASK})


export const addAssetRelation = payload => ({
  payload, type: ADD_ASSET_RELATION})
export const dropAssetRelation = payload => ({
  payload, type: DROP_ASSET_RELATION})


export const resetAssetTasks = (payload={}) => ({
  payload, type: RESET_ASSET_TASKS})
export const resetTasks = payload => ({
  payload, type: RESET_TASKS})
export const setTask = payload => ({
  payload, type: SET_TASK})


export const resetDashboards = payload => ({
  payload, type: RESET_DASHBOARDS})
export const resetAssetsKit = (payload={}) => ({
  payload, type: RESET_ASSETS_KIT})
export const resetLogs = payload => ({
  payload, type: RESET_LOGS})
export const sortAssets = payload => ({
  payload, type: SET_SORTED_ASSETS})
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
export const setAppValues = payload => ({
  payload, type: SET_APP_VALUES})
export const toggleTheme = payload => ({
  payload, type: TOGGLE_THEME})


export const excludeAssetRelation = payload => ({
  payload, type: EXCLUDE_ASSET_RELATION})
export const includeAssetRelation = payload => ({
  payload, type: INCLUDE_ASSET_RELATION})


export const setAssetsFilterValues = payload => ({
  payload, type: SET_ASSET_FILTER_VALUES})


export const excludeAssetsFilterKey = payload => ({
  payload, type: EXCLUDE_ASSET_FILTER_KEY})
export const includeAssetsFilterKey = payload => ({
  payload, type: INCLUDE_ASSET_FILTER_KEY})
export const setAssetsFilterKeys = payload => ({
  payload, type: SET_ASSET_FILTER_KEYS})
export const toggleAssetsFilterKey = payload => ({
  payload, type: TOGGLE_ASSET_FILTER_KEY})


export const setFocusingAsset = payload => ({
  payload, type: SET_FOCUSING_ASSET})
export const setRelatingAsset = payload => ({
  payload, type: SET_RELATING_ASSET})
export const setLocatingAsset = payload => ({
  payload, type: SET_LOCATING_ASSET})
export const toggleSelectedAsset = payload => ({
  payload, type: TOGGLE_SELECTED_ASSET})
export const setSelectedAsset = payload => ({
  payload, type: SET_SELECTED_ASSET})


export const deselectEverything = payload => ({
  payload, type: DESELECT_EVERYTHING})


export const openAssetAddDialog = payload => ({
  payload, type: OPEN_ASSET_ADD_DIALOG})
export const closeAssetAddDialog = payload => ({
  payload, type: CLOSE_ASSET_ADD_DIALOG})
export const setAddingAssetValues = payload => ({
  payload, type: SET_ADDING_ASSET_VALUES})
export const setAddingAssetErrors = payload => ({
  payload, type: SET_ADDING_ASSET_ERRORS})


export const openTaskEditDialog = payload => ({
  payload, type: OPEN_TASK_EDIT_DIALOG})
export const closeTaskEditDialog = payload => ({
  payload, type: CLOSE_TASK_EDIT_DIALOG})
export const setEditingTaskValues = payload => ({
  payload, type: SET_EDITING_TASK_VALUES})
export const setEditingTaskErrors = payload => ({
  payload, type: SET_EDITING_TASK_ERRORS})


export const openAssetsUploadDialog = payload => ({
  payload, type: OPEN_ASSETS_UPLOAD_DIALOG})
export const closeAssetsUploadDialog = payload => ({
  payload, type: CLOSE_ASSETS_UPLOAD_DIALOG})
export const uploadAssetsCsv = payload => ({
  payload, type: UPLOAD_ASSETS_CSV})
export const downloadAssetsUploadDialog = payload => ({
  payload, type: DOWNLOAD_ASSETS_CSV})
export const downloadAssetsDss = payload => ({
  payload, type: DOWNLOAD_ASSETS_DSS})
export const setAssetCSVFile = payload => ({
  payload, type: SET_ASSET_CSV_FILE})
export const setOverwriteRecords = payload => ({
  payload, type: SET_OVERWRITE_ASSETS})
export const setAddingAssetCSVFileErrors = payload => ({
  payload, type: SET_ADDING_CSV_ASSETS_ERRORS})
export const hideAddingAssetCSVFileErrors = payload => ({
  payload, type: HIDE_ADDING_CSV_ASSETS_ERRORS})


export const setMapViewport = payload => ({
  type: SET_MAP_VIEWPORT, payload
})
export const setBaseMapStyleName = payload => ({
  type: SET_BASE_MAP_STYLE_NAME, payload
})
