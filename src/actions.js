import {
  ADD_ASSET,
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  CLOSE_ASSET_ADD_DIALOG,
  CLOSE_TASK_ADD_DIALOG,
  CLOSE_INFORMATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  CLOSE_ASSETS_UPLOAD_DIALOG,
  UPLOAD_ASSETS_CSV,
  DOWNLOAD_ASSETS_CSV,
  DROP_ASSET_RELATION,
  EXCLUDE_ASSET_FILTER_KEY,
  EXCLUDE_ASSET_RELATION,
  INCLUDE_ASSET_FILTER_KEY,
  INCLUDE_ASSET_RELATION,
  LOG_ERROR,
  MERGE_ASSET,
  OPEN_ASSET_ADD_DIALOG,
  OPEN_TASK_ADD_DIALOG,
  OPEN_INFORMATION_DRAWER,
  OPEN_NAVIGATION_DRAWER,
  OPEN_ASSETS_UPLOAD_DIALOG,
  REFRESH_ASSETS_KIT,
  REFRESH_ASSETS_LOGS,
  REFRESH_DASHBOARDS,
  REFRESH_TASKS,
  RESET_ASSETS_KIT,
  RESET_ASSETS_LOGS,
  RESET_DASHBOARDS,
  RESET_TASKS,
  SET_ADDING_ASSET_ERRORS,
  SET_ADDING_ASSET_VALUE,
  SET_ADDING_TASK_VALUE,
  SET_APP_VALUE,
  SET_SORTED_ASSETS,
  SET_ASSET,
  SET_TASK,
  SET_ASSETS,
  SET_ASSET_ERRORS,
  SET_ASSET_FILTER_KEYS,
  SET_ASSET_FILTER_VALUE,
  SET_ASSET_LOCATION,
  SET_FOCUSING_ASSET,
  SET_LOCATING_ASSET,
  TOGGLE_SELECTED_ASSET,
  SET_MAP_VIEWPORT,
  SET_RELATING_ASSET,
  SET_ASSET_CSV_FILE,
  SET_ADDING_CSV_ASSETS_ERRORS,
  HIDE_ADDING_CSV_ASSETS_ERRORS,
  TOGGLE_ASSET_FILTER_KEY,
  TOGGLE_THEME,
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
export const refreshAssetsLogs = payload => ({
  payload, type: REFRESH_ASSETS_LOGS})
export const refreshTasks = payload => ({
  payload, type: REFRESH_TASKS})
export const addAsset = payload => ({
  payload, type: ADD_ASSET})
export const addTask = payload => ({
  payload, type: ADD_ASSET
})
export const changeAsset = payload => ({
  payload, type: CHANGE_ASSET
})


export const addAssetRelation = payload => ({
  payload, type: ADD_ASSET_RELATION
})
export const dropAssetRelation = payload => ({
  payload, type: DROP_ASSET_RELATION
})


export const resetDashboards = payload => ({
  payload, type: RESET_DASHBOARDS})
export const resetAssetsKit = (payload={}) => ({
  payload, type: RESET_ASSETS_KIT
})
export const resetAssetsLogs = payload => ({
  payload, type: RESET_ASSETS_LOGS
})
export const resetTasks = payload => ({
  payload, type: RESET_TASKS
})
export const sortAssets = payload => ({
  payload, type: SET_SORTED_ASSETS
})
export const setAssets = payload => ({
  payload, type: SET_ASSETS
})
export const setAsset = payload => ({
  payload, type: SET_ASSET
})
export const setTask = payload => ({
  payload, type: SET_TASK
})
export const mergeAsset = payload => ({
  payload, type: MERGE_ASSET
})
export const setAssetErrors = payload => ({
  payload, type: SET_ASSET_ERRORS
})
export const setAssetLocation = payload => ({
  payload, type: SET_ASSET_LOCATION
})


export const closeInformationDrawer = payload => ({
  payload, type: CLOSE_INFORMATION_DRAWER
})
export const closeNavigationDrawer = payload => ({
  payload, type: CLOSE_NAVIGATION_DRAWER
})
export const openInformationDrawer = payload => ({
  payload, type: OPEN_INFORMATION_DRAWER
})
export const openNavigationDrawer = payload => ({
  payload, type: OPEN_NAVIGATION_DRAWER
})
export const setAppValue = payload => ({
  payload, type: SET_APP_VALUE
})
export const toggleTheme = payload => ({
  payload, type: TOGGLE_THEME
})


export const excludeAssetRelation = payload => ({
  payload, type: EXCLUDE_ASSET_RELATION
})
export const includeAssetRelation = payload => ({
  payload, type: INCLUDE_ASSET_RELATION
})


export const setAssetsFilterValue = payload => ({
  payload, type: SET_ASSET_FILTER_VALUE
})


export const excludeAssetsFilterKey = payload => ({
  payload, type: EXCLUDE_ASSET_FILTER_KEY
})
export const includeAssetsFilterKey = payload => ({
  payload, type: INCLUDE_ASSET_FILTER_KEY
})
export const setAssetsFilterKeys = payload => ({
  payload, type: SET_ASSET_FILTER_KEYS
})
export const toggleAssetsFilterKey = payload => ({
  payload, type: TOGGLE_ASSET_FILTER_KEY
})


export const setFocusingAsset = payload => ({
  payload, type: SET_FOCUSING_ASSET
})
export const setRelatingAsset = payload => ({
  payload, type: SET_RELATING_ASSET
})
export const setLocatingAsset = payload => ({
  payload, type: SET_LOCATING_ASSET
})
export const toggleSelectedAsset = payload => ({
  payload, type: TOGGLE_SELECTED_ASSET
})


export const openAssetAddDialog = payload => ({
  payload, type: OPEN_ASSET_ADD_DIALOG
})
export const closeAssetAddDialog = payload => ({
  payload, type: CLOSE_ASSET_ADD_DIALOG
})
export const openTaskAddDialog = payload => ({
  payload, type: OPEN_TASK_ADD_DIALOG
})
export const closeTaskAddDialog = payload => ({
  payload, type: CLOSE_TASK_ADD_DIALOG
})
export const setAddingAssetValue = payload => ({
  payload, type: SET_ADDING_ASSET_VALUE
})
export const setAddingTaskValue = payload => ({
  payload, type: SET_ADDING_TASK_VALUE
})
export const setAddingAssetErrors = payload => ({
  payload, type: SET_ADDING_ASSET_ERRORS
})

export const openAssetsUploadDialog = payload => ({
  payload, type: OPEN_ASSETS_UPLOAD_DIALOG})
export const closeAssetsUploadDialog = payload => ({
  payload, type: CLOSE_ASSETS_UPLOAD_DIALOG})
export const uploadAssetsCsv = payload => ({
  payload, type: UPLOAD_ASSETS_CSV})
export const downloadAssetsUploadDialog = payload => ({
  payload, type: DOWNLOAD_ASSETS_CSV})
export const setAssetCSVFile = payload => ({
  payload, type: SET_ASSET_CSV_FILE})
export const setAddingAssetCSVFileErrors = payload => ({
  payload, type: SET_ADDING_CSV_ASSETS_ERRORS})
export const hideAddingAssetCSVFileErrors = payload => ({
  payload, type: HIDE_ADDING_CSV_ASSETS_ERRORS})

export const setMapViewport = payload => ({
  type: SET_MAP_VIEWPORT, payload
})
