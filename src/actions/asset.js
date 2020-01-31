import {
  ADD_ASSET_CONNECTION,
  REFRESH_ASSETS_KIT,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_FOCUSING_ASSET_ID,
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

export function addAssetConnection(assetId, busId) {
  return {type: ADD_ASSET_CONNECTION, payload: {assetId, busId}}
}

export function refreshAssetsKit() {
  return {type: REFRESH_ASSETS_KIT}
}
