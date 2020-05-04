import {
  SET_MAP_BOUNDING_BOX,
  SET_MAP_VIEW_STATE,
} from '../constants'

export function setMapViewState(viewState) {
  return { type: SET_MAP_VIEW_STATE, payload: viewState }
}

export function setMapBoundingbox(boundingBox) {
  return { type: SET_MAP_BOUNDING_BOX, payload: boundingBox }
}
