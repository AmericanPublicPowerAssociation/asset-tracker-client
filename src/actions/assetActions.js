import {
  ADD_ASSET_CONNECTION,
  SET_ASSET,
  SET_ASSETS_GEOJSON,
  SET_FOCUSING_ASSET_ID,
} from '../constants'

export function setAssetsGeojson(geojson) {
  return {type: SET_ASSETS_GEOJSON, payload: geojson}
}

export function setAsset(asset) {
  return {type: SET_ASSET, payload: asset}
}

export function setFocusingAssetId(id) {
  return {type: SET_FOCUSING_ASSET_ID, payload: id}
}

export function addAssetConnection(assetId, busId) {
  return {type: ADD_ASSET_CONNECTION, payload: {assetId, busId}}
}
