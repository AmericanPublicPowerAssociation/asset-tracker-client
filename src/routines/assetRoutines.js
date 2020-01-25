import {
  ABBREVIATED_ASSET_ID_LENGTH,
  ADD_LINE,
  ADD_SUBSTATION,
  ADD_TRANSFORMER,
  ASSET_TYPE_BY_ID,
  LINE_ASSET_TYPE_ID,
  MINIMUM_ASSET_ID_LENGTH,
  MINIMUM_BUS_ID_LENGTH,
  SUBSTATION_ASSET_TYPE_ID,
  TRANSFORMER_ASSET_TYPE_ID,
} from '../constants'
import {
  getRandomId,
} from '../macros'

export function makeAsset(sketchMode, lineBusId) {
  const assetId = getRandomId(MINIMUM_ASSET_ID_LENGTH)
  const assetTypeId = getAssetTypeId(sketchMode)
  const assetName = getAssetName(assetTypeId, assetId)
  const asset = {id: assetId, typeId: assetTypeId, name: assetName}

  switch(assetTypeId) {
    case LINE_ASSET_TYPE_ID: {
      const busId = lineBusId || getRandomId(MINIMUM_BUS_ID_LENGTH)
      asset.connections = [{busId}]
      break
    }
    case TRANSFORMER_ASSET_TYPE_ID: {
      asset.connections = [
        {busId: getRandomId(MINIMUM_BUS_ID_LENGTH)},
        {busId: getRandomId(MINIMUM_BUS_ID_LENGTH)}]
      break
    }
    default: { }
  }

  return asset
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
