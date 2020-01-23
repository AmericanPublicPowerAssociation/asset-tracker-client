import {
  ABBREVIATED_ASSET_ID_LENGTH,
  ADD_LINE,
  ADD_SUBSTATION,
  ADD_TRANSFORMER,
  ASSET_TYPE_BY_ID,
  LINE_ASSET_TYPE_ID,
  MINIMUM_ASSET_ID_LENGTH,
  SUBSTATION_ASSET_TYPE_ID,
  TRANSFORMER_ASSET_TYPE_ID,
} from '../constants'
import {
  getRandomString,
} from '../macros'

export function getRandomAssetId() {
  const monotonicallyIncreasingNumber = Date.now()
  const randomString = getRandomString(MINIMUM_ASSET_ID_LENGTH)
  return randomString + monotonicallyIncreasingNumber
}

export function getAssetTypeId(sketchMode) {
  return {
    [ADD_LINE]: LINE_ASSET_TYPE_ID,
    [ADD_TRANSFORMER]: TRANSFORMER_ASSET_TYPE_ID,
    [ADD_SUBSTATION]: SUBSTATION_ASSET_TYPE_ID,
  }[sketchMode]
}

export function getAssetName(assetTypeId, assetId) {
  const assetType = ASSET_TYPE_BY_ID[assetTypeId]
  const abbreviatedAssetId = assetId.substring(
    0, ABBREVIATED_ASSET_ID_LENGTH)
  return `${assetType.name} ${abbreviatedAssetId}`
}
