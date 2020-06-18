import {
  PAN_MAP_TO_ASSET,
} from '../constants'

export function panMapToAsset(assetGeoJson) {
  return { type: PAN_MAP_TO_ASSET, payload: assetGeoJson }
}
