import {
  PAN_MAP_TO_ASSET,
  SET_OVERLAY_MODE,
  SET_SKETCH_MODE,
} from '../constants'

export function panMapToAsset(assetGeoJson) {
  return { type: PAN_MAP_TO_ASSET, payload: assetGeoJson }
}

export function setOverlayMode(overlayMode) {
  return { type: SET_OVERLAY_MODE, payload: overlayMode }
}
