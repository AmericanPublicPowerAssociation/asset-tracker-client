// TODO: Convert back to arrow functions

import {
  DELETE_ASSET,
  DELETE_ASSET_CONNECTION,
  DELETE_ASSET_VERTEX,
  FILL_ASSET_NAME,
  INSERT_ASSET_VERTEX,
  REFRESH_ASSETS,
  SAVE_ASSETS,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
  SET_SELECTED_ASSET_ID,
  SET_TEMPORARY_ASSET,
  UPLOAD_ASSETS_CSV,
} from '../constants'

export const refreshAssets = () => ({
  type: REFRESH_ASSETS,
})

export const saveAssets = () => ({
  type: SAVE_ASSETS,
})

export const setAssets = assets => ({
  type: SET_ASSETS, payload: assets,
})

export const setAssetsGeoJson = geojson => ({
  type: SET_ASSETS_GEOJSON, payload: geojson,
})

export const fillAssetName = (assetId, feature) => ({
  type: FILL_ASSET_NAME, payload: { assetId, feature },
})

export const setSelectedAssetId = assetId => ({
  type: SET_SELECTED_ASSET_ID, payload: assetId,
})

export const setTemporaryAsset = asset => ({
  type: SET_TEMPORARY_ASSET, payload: asset,
})

export const setAsset = asset => ({
  type: SET_ASSET, payload: asset,
})

export const deleteAsset = assetId => ({
  type: DELETE_ASSET, payload: assetId,
})

export const setAssetConnection = (assetId, vertexIndex, connection) => ({
  type: SET_ASSET_CONNECTION,
  payload: { assetId, vertexIndex, connection },
})

export const deleteAssetConnection = (assetId, vertexIndex) => ({
  type: DELETE_ASSET_CONNECTION,
  payload: { assetId, vertexIndex },
})

// TODO: Review all code below

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

export function setAssetConnectionAttribute(
  assetId, assetVertexIndex, key, value,
) {
  return {
    type: SET_ASSET_CONNECTION_ATTRIBUTE,
    payload: { assetId, assetVertexIndex, key, value },
  }
}

export function insertAssetVertex(assetId, afterIndex, connection) {
  return {
    type: INSERT_ASSET_VERTEX,
    payload: { assetId, afterIndex, connection },
  }
}

export function deleteAssetVertex(assetId, oldVertexIndex, newVertexCount) {
  return {
    type: DELETE_ASSET_VERTEX,
    payload: { assetId, oldVertexIndex, newVertexCount },
  }
}

export function uploadAssetsCsv(payload) {
  return { type: UPLOAD_ASSETS_CSV, payload }
}

// TODO: Review all code above
