import {
  SET_MAP_VIEW_STATE,
  SET_POPUP_STATE,
  SET_SELECTED_ASSET_INDEXES,
  SET_SELECTED_BUS_INDEXES,
  SET_SKETCH_MODE,
  TOGGLE_MAP_STYLE,
} from '../constants'

export function toggleMapStyle() {
  return { type: TOGGLE_MAP_STYLE }
}

export function setMapViewState(viewState) {
  return { type: SET_MAP_VIEW_STATE, payload: viewState }
}

export function setSketchMode(sketchMode) {
  return { type: SET_SKETCH_MODE, payload: sketchMode }
}

export function setPopUpState(popUpState) {
  return { type: SET_POPUP_STATE, payload: popUpState }
}

export function setSelectedAssetIndexes(selectedAssetIndexes) {
  return { type: SET_SELECTED_ASSET_INDEXES, payload: selectedAssetIndexes }
}

export function setSelectedBusIndexes(selectedBusIndexes) {
  return { type: SET_SELECTED_BUS_INDEXES, payload: selectedBusIndexes }
}
