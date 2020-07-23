import {
  CENTER_MAP,
  SET_MAP_VIEW_STATE,
  SET_OVERLAY_MODE,
  SET_POPUP_STATE,
  SET_POPUP_DELETE_MIDPOINT,
  SET_SELECTED_ASSET_INDEXES,
  SET_SELECTED_BUS_INDEXES,
  SET_SELECTION,
  SET_SKETCH_MODE,
  TOGGLE_MAP_STYLE,
} from '../constants'

export function toggleMapStyle() {
  return { type: TOGGLE_MAP_STYLE }
}

export function setMapViewState(viewState) {
  return { type: SET_MAP_VIEW_STATE, payload: viewState }
}

export function setOverlayMode(overlayMode) {
  return { type: SET_OVERLAY_MODE, payload: overlayMode }
}

export function setSketchMode(sketchMode) {
  return { type: SET_SKETCH_MODE, payload: sketchMode }
}

export function setPopUpState(popUpState) {
  return { type: SET_POPUP_STATE, payload: popUpState }
}

export function setPopUpDeleteMidpoint(popUpState) {
  return { type: SET_POPUP_DELETE_MIDPOINT, payload: popUpState }
}
export function setSelection(payload) {
  return { type: SET_SELECTION, payload }
}

export function setSelectedAssetIndexes(selectedAssetIndexes) {
  return { type: SET_SELECTED_ASSET_INDEXES, payload: selectedAssetIndexes }
}

export function setSelectedBusIndexes(selectedBusIndexes) {
  return { type: SET_SELECTED_BUS_INDEXES, payload: selectedBusIndexes }
}

export function centerMap(geojsonFeature) {
  return { type: CENTER_MAP, payload: geojsonFeature }
}
