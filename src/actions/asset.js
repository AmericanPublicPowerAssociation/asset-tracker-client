// TODO: Make ids consistently explicit

import {
  DELETE_ASSET,
  FILL_ASSET_NAME,
  REFRESH_ASSETS,
  REMOVE_LINE_END_POINT,
  SAVE_ASSETS,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
  SET_EDITING_ASSET,
  SET_EDITING_ASSET_VALUE,
  SET_FOCUSING_ASSET_ID,
  UPLOAD_ASSETS_CSV,
} from '../constants'

export function refreshAssets() {
  return { type: REFRESH_ASSETS }
}

export function setAssets(assets) {
  return { type: SET_ASSETS, payload: assets }
}

export function setAsset(asset) {
  return { type: SET_ASSET, payload: asset }
}

export function saveAssets() {
  return { type: SAVE_ASSETS }
}

export function deleteAsset(assetId){
  return { type: DELETE_ASSET, payload: { assetId } }
}

export function setAssetValue(assetId, key, value) {
  return {
    type: SET_ASSET_VALUE,
    payload: { assetId, key, value },
  }
}

export function setAssetAttribute(assetId, key, value) {
  return {
    type: SET_ASSET_ATTRIBUTE,
    payload: { assetId, key, value },
  }
}

export function setAssetConnection(assetId, assetVertexIndex, connection) {
  return {
    type: SET_ASSET_CONNECTION,
    payload: { assetId, assetVertexIndex, connection },
  }
}

export function setAssetConnectionAttribute(
  assetId, assetVertexIndex, key, value,
) {
  return {
    type: SET_ASSET_CONNECTION_ATTRIBUTE,
    payload: { assetId, assetVertexIndex, key, value },
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

export function setEditingAsset(asset) {
  return {
    type: SET_EDITING_ASSET,
    payload: asset,
  }
}

export function setEditingAssetValue(key, value) {
  return {
    type: SET_EDITING_ASSET_VALUE,
    payload: { key, value },
  }
}

export function fillAssetName(assetId, feature) {
  return {
    type: FILL_ASSET_NAME,
    payload: { assetId, feature },
  }
}

export function uploadAssetsCsv(payload) {
  return {
    type: UPLOAD_ASSETS_CSV,
    payload,
  }
}

export function removeLineEndPoint(
  assetId, assetVertexIndex, largestAssetVertexIndex,
) {
  return {
    type: REMOVE_LINE_END_POINT,
    payload: { assetId, assetVertexIndex, largestAssetVertexIndex },
  }
}
