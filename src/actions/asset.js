import {
  SET_ASSETS_GEOJSON,
  SET_SELECTED_ASSET_ID,
} from '../constants'

export function setAssetsGeoJson(geojson) {
  return { type: SET_ASSETS_GEOJSON, payload: geojson }
}

export function setSelectedAssetId(assetId) {
  return { type: SET_SELECTED_ASSET_ID, payload: assetId }
}

