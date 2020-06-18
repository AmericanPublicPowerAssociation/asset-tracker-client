import {
  REFRESH_ASSETS,
  SAVE_ASSETS,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
  SET_SELECTED_ASSET_ID,
} from '../constants'

export function refreshAssets() {
  return { type: REFRESH_ASSETS }
}

export function saveAssets() {
  return { type: SAVE_ASSETS }
}

export function setAssets(assets) {
  return { type: SET_ASSETS, payload: assets }
}

export function setAssetsGeoJson(geojson) {
  return { type: SET_ASSETS_GEOJSON, payload: geojson }
}

export function setSelectedAssetId(assetId) {
  return { type: SET_SELECTED_ASSET_ID, payload: assetId }
}

