import {
  SET_SELECTED_FEATURE_INDEXES,
  SET_MAP_VIEW_STATE,
  SET_SKETCH_ASSET_TYPE,
} from '../constants'

export function setMapViewState(viewState) {
  return {
    type: SET_MAP_VIEW_STATE,
    payload: viewState,
  }
}

export function setSelectedFeatureIndexes(indexes) {
  return {
    type: SET_SELECTED_FEATURE_INDEXES,
    payload: indexes
  }
}

export function setSketchAssetType(sketchAssetType) {
  return {
    type: SET_SKETCH_ASSET_TYPE,
    payload: sketchAssetType
  }
}
