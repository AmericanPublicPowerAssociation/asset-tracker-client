import {
  ADD_ASSET_TO_ASSET_BY_ID,
  SET_FOCUSING_ASSET_ID,
  SET_ASSETS_GEOJSON,
  SET_ASSETS,
  MERGE_ASSET,
  CHANGE_ASSET,
} from '../constants'

export function setFocusingAssetId(id) {
  return {
    type: SET_FOCUSING_ASSET_ID,
    payload: id,
  }
}


export function setAssets(assets) {
  return {
    type: SET_ASSETS,
    payload: assets,
  }
}


export function setAssetsGeojson(geojson) {
  return {
    type: SET_ASSETS_GEOJSON,
    payload: geojson,
  }
}


export function addToAssetById(newAsset) {
  return {
    type: ADD_ASSET_TO_ASSET_BY_ID,
    payload: newAsset
  }
}


export function changeAsset(payload) {
  return {
    payload,
    type: CHANGE_ASSET
  }
}


export function mergeAsset(payload) {
  return {
    payload,
    type: MERGE_ASSET
  }
}
