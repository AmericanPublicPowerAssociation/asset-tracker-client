import {
  SET_FOCUSING_ASSET_ID,
} from '../constants'

export function setFocusingAssetId(id) {
  return {
    type: SET_FOCUSING_ASSET_ID,
    payload: id,
  }
}
