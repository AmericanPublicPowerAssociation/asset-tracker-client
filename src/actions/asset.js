import {
  ADD_ASSET_CONNECTION,
  DELETE_ASSET,
  REFRESH_ASSETS,
  SAVE_ASSETS,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
  SET_FOCUSING_ASSET_ID,
  UPDATE_ASSETS,
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

export function setFocusingAssetId(id) {
  return {
    type: SET_FOCUSING_ASSET_ID,
    payload: id,
  }
}
