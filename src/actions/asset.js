import {
  ADD_ASSET_CONNECTION,
  REFRESH_ASSETS_KIT,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_FOCUSING_ASSET_ID,
  UPDATE_ASSET,
  SET_ASSET_ATTRIBUTES,
  SET_ASSET_CONNECTION_ATTRIBUTE,
} from '../constants'

export function setAssetsGeojson(geojson) {
  return {type: SET_ASSETS_GEOJSON, payload: geojson}
}

export function setAsset(asset) {
  return {type: SET_ASSET, payload: asset}
}

export function setAssets(assets) {
  return {type: SET_ASSETS, payload: assets}
}

export function setFocusingAssetId(id) {
  return {type: SET_FOCUSING_ASSET_ID, payload: id}
}

export function updateAsset(assetId, key, val){
  return {
    type: UPDATE_ASSET,
    payload: {
      assetId,
      data: {[key]: val}
    }
  }
}

export function setAssetConnectionAttribute(assetId, connIndex, key, val){
  return {
    type: SET_ASSET_CONNECTION_ATTRIBUTE,
    payload: {assetId, connIndex, key, val}
  }
}

export function addAssetConnection(assetId, busId) {
  return {type: ADD_ASSET_CONNECTION, payload: {assetId, busId}}
}

export function refreshAssetsKit() {
  return {type: REFRESH_ASSETS_KIT}
}

export function setAssetAttributes(assetId, attributes) {
  return {type: SET_ASSET_ATTRIBUTES, payload: {assetId, attributes}}
}
