import {
  SET_MAP_VIEW_STATE,
} from '../constants'

export function setMapViewState(viewState) {
  return {type: SET_MAP_VIEW_STATE, payload: viewState}
}
