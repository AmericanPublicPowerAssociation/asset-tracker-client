import {
  SET_PAN_MAP_TO_ASSET,
  SET_MAP_BOUNDING_BOX,
  SET_MAP_VIEW_STATE,
} from '../constants'

export function setMapViewState(viewState) {
  return { type: SET_MAP_VIEW_STATE, payload: viewState }
}

export function setMapBoundingbox(boundingBox) {
  return { type: SET_MAP_BOUNDING_BOX, payload: boundingBox }
}

export function setPanMapToAsset(assetGeoJson) {
  return { type: SET_PAN_MAP_TO_ASSET, payload: assetGeoJson }
}
