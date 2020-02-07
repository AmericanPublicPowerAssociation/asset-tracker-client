import {
  ADD_ASSET_CONNECTION,
  REFRESH_ASSETS,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_ASSET_ATTRIBUTE,
  SET_ASSET_CONNECTION_ATTRIBUTE,
  SET_ASSET_VALUE,
  SET_FOCUSING_ASSET_ID,
} from '../constants'

export function refreshAssets() {
  return {type: REFRESH_ASSETS}
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

export function setAssetsGeojson(geojson) {
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
