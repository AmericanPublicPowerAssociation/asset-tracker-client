import {
  SET_PAN_MAP_TO_ASSET,
  SET_MAP_BOUNDING_BOX,
  SET_MAP_VIEW_STATE,
  SET_OVERLAY_MODE,
  SET_SELECTED_ASSET_INDEXES,
  SET_SELECTED_BUS_INDEXES,
  SET_SKETCH_MODE,
} from '../constants'

export function setMapViewState(viewState) {
  return { type: SET_MAP_VIEW_STATE, payload: viewState }
}

export function setMapBoundingBox(boundingBox) {
  return { type: SET_MAP_BOUNDING_BOX, payload: boundingBox }
}

export function setPanMapToAsset(assetGeoJson) {
  return { type: SET_PAN_MAP_TO_ASSET, payload: assetGeoJson }
}

export function setOverlayMode(overlayMode) {
  return { type: SET_OVERLAY_MODE, payload: overlayMode }
}

export function setSketchMode(sketchMode) {
  return { type: SET_SKETCH_MODE, payload: sketchMode }
}

export function setSelectedAssetIndexes(selectedAssetIndexes) {
  return {
    type: SET_SELECTED_ASSET_INDEXES,
    payload: selectedAssetIndexes,
  }
}

export function setSelectedBusIndexes(selectedBusIndexes) {
  return {
    type: SET_SELECTED_BUS_INDEXES,
    payload: selectedBusIndexes,
  }
}
