import {
  ADD_ASSET_CONNECTION,
  DELETE_ASSET,
  REFRESH_ASSETS,
  SAVE_ASSETS,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
  SET_FOCUSING_ASSET_ID,
  UPDATE_ASSETS,
  REFRESH_TASKS,
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  SET_ASSET_COMMENTS, REFRESH_ASSET_COMMENTS, ADD_TASK_COMMENT, UPLOAD_ASSETS_CSV,
} from '../constants'

export function saveAssets() {
  return {type: SAVE_ASSETS}
}

export function refreshAssets() {
  return {type: REFRESH_ASSETS}
}

export function updateAssets(assets, assetsGeoJson) {
  return {
    type: UPDATE_ASSETS,
    payload: {assets, assetsGeoJson},
  }
}

export function setAssets(assets) {
  return {
    type: SET_ASSETS,
    payload: assets,
  }
}

export function setAsset(asset) {
  return {
    type: SET_ASSET,
    payload: asset,
  }
}

export function deleteAsset(assetId){
  return {
    type: DELETE_ASSET,
    payload: assetId
  }
}

export function setAssetValue(assetId, key, value) {
  return {
    type: SET_ASSET_VALUE,
    payload: {assetId, key, value},
  }
}

export function setAssetAttribute(assetId, key, value) {
  return {
    type: SET_ASSET_ATTRIBUTE,
    payload: {assetId, key, value},
  }
}

export function addAssetConnection(assetId, busId) {
  return {
    type: ADD_ASSET_CONNECTION,
    payload: {assetId, busId},
  }
}

export function setAssetConnection(assetId, connectionIndex, connection) {
  return {
    type: SET_ASSET_CONNECTION,
    payload: {assetId, connectionIndex, connection},
  }
}

export function setAssetConnectionAttribute(
  assetId, connectionIndex, key, value,
) {
  return {
    type: SET_ASSET_CONNECTION_ATTRIBUTE,
    payload: {assetId, connectionIndex, key, value},
  }
}

export function setAssetsGeoJson(geojson) {
  return {
    type: SET_ASSETS_GEOJSON,
    payload: geojson,
  }
}

export function setAssetComments({task_id, comments}) {
  return {
    type: SET_ASSET_COMMENTS,
    payload: {task_id, comments}
  }
}

export function setFocusingAssetId(id) {
  return {
    type: SET_FOCUSING_ASSET_ID,
    payload: id,
  }
}

export function refreshTasks() {
  return {
    type: REFRESH_TASKS
  }
}

export function setTasks(assets) {
  return {
    type: SET_TASKS,
    payload: assets
  }
}

export function addAssetTask(assetId, name, description, priority) {
  return {
    type: ADD_TASK,
    payload: {assetId, name, description, priority},
  }
}

export function setTaskStatus(task_id, status, priority) {
  return {
    type: UPDATE_TASK,
    payload: {task_id, status, priority},
  }
}

export function setTaskPriority(task_id, priority, status) {
  return {
    type: UPDATE_TASK,
    payload: {task_id, priority, status},
  }
}

export function updateTaskComments(task_id) {
  return {
    type: REFRESH_ASSET_COMMENTS,
    payload: {task_id}
  }
}

export function addAssetTaskComment(task_id, text) {
  return {
    type: ADD_TASK_COMMENT,
    payload: {task_id, text},
  }
}

export function uploadAssetsCsv(payload) {
  return {
    type: UPLOAD_ASSETS_CSV,
    payload,
  }
}