import {
  ABBREVIATED_ASSET_ID_LENGTH,
  ADD_LINE,
  ADD_SUBSTATION,
  ADD_TRANSFORMER,
  ASSET_TYPE_BY_CODE,
  LINE_ASSET_TYPE_CODE,
  MINIMUM_ASSET_ID_LENGTH,
  MINIMUM_BUS_ID_LENGTH,
  SUBSTATION_ASSET_TYPE_CODE,
  TRANSFORMER_ASSET_TYPE_CODE,
} from '../constants'
import {
  getRandomId,
} from '../macros'

export function makeAsset(sketchMode, lineBusId) {
  const assetId = getRandomId(MINIMUM_ASSET_ID_LENGTH)
  const assetTypeCode = getAssetTypeCode(sketchMode)
  const assetName = getAssetName(assetTypeCode, assetId)
  const asset = {id: assetId, typeCode: assetTypeCode, name: assetName}

  switch(assetTypeCode) {
    case LINE_ASSET_TYPE_CODE: {
      const busId = lineBusId || getRandomId(MINIMUM_BUS_ID_LENGTH)
      asset.connections = [{busId}]
      break
    }
    case TRANSFORMER_ASSET_TYPE_CODE: {
      asset.connections = [
        {busId: getRandomId(MINIMUM_BUS_ID_LENGTH)},
        {busId: getRandomId(MINIMUM_BUS_ID_LENGTH)}]
      break
    }
    default: { }
  }

  return asset
}

export function getAssetTypeCode(sketchMode) {
  return {
    [ADD_LINE]: LINE_ASSET_TYPE_CODE,
    [ADD_TRANSFORMER]: TRANSFORMER_ASSET_TYPE_CODE,
    [ADD_SUBSTATION]: SUBSTATION_ASSET_TYPE_CODE,
  }[sketchMode]
}

export function getAssetName(assetTypeCode, assetId) {
  const assetType = ASSET_TYPE_BY_CODE[assetTypeCode]
  const abbreviatedAssetId = assetId.substring(
    0, ABBREVIATED_ASSET_ID_LENGTH)
  return `${assetType.name} ${abbreviatedAssetId}`
}
