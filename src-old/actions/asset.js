import {
  DELETE_ASSET,
  DELETE_ASSET_VERTEX,
  FILL_ASSET_NAME,
  INSERT_ASSET_VERTEX,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
  SET_TEMPORARY_ASSET,
  SET_TEMPORARY_ASSET_VALUE,
  UPLOAD_ASSETS_CSV,
} from '../constants'

export function setAsset(asset) {
  return { type: SET_ASSET, payload: asset }
}

export function deleteAsset(assetId){
  return { type: DELETE_ASSET, payload: assetId }
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

export function setTemporaryAsset(asset) {
  return { type: SET_TEMPORARY_ASSET, payload: asset }
}

export function setTemporaryAssetValue(key, value) {
  return {
    type: SET_TEMPORARY_ASSET_VALUE,
    payload: { key, value },
  }
}

export function fillAssetName(assetId, feature) {
  return {
    type: FILL_ASSET_NAME,
    payload: { assetId, feature },
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
