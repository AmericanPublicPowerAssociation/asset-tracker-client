import {
  ABBREVIATED_ASSET_ID_LENGTH,
  ASSET_TYPE_BY_CODE,
  ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_SUBSTATION,
  ASSET_TYPE_CODE_TRANSFORMER,
  MINIMUM_ASSET_ID_LENGTH,
  MINIMUM_BUS_ID_LENGTH,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
} from '../constants'
import {
  ReactComponent as LineIcon
} from '../images/assets/line-16.svg'
import {
  ReactComponent as TransformerIcon
} from '../images/assets/transformer-16.svg'
import {
  ReactComponent as SubstationIcon
} from '../images/assets/substation-16.svg'
import {
  ReactComponent as MeterIcon
} from '../images/assets/meter-light-16.svg'
import {
  getRandomId,
} from '../macros'

export function makeAsset(sketchMode, lineBusId) {
  const assetId = getRandomId(MINIMUM_ASSET_ID_LENGTH)
  const assetTypeCode = getAssetTypeCode(sketchMode)
  const assetName = getAssetName(assetTypeCode, assetId)
  const asset = {id: assetId, typeCode: assetTypeCode, name: assetName}

  switch(assetTypeCode) {
    case ASSET_TYPE_CODE_LINE: {
      const busId = lineBusId || getRandomId(MINIMUM_BUS_ID_LENGTH)
      asset.connections = [{busId}]
      break
    }
    case ASSET_TYPE_CODE_TRANSFORMER: {
      asset.connections = [
        {busId: getRandomId(MINIMUM_BUS_ID_LENGTH)},
        {busId: getRandomId(MINIMUM_BUS_ID_LENGTH)}]
      break
    }
    case ASSET_TYPE_CODE_METER: {
      asset.connections = [
        {busId: getRandomId(MINIMUM_BUS_ID_LENGTH)},
      ]
      break
    }
    default: { }
  }

  return asset
}

export function getAssetTypeCode(sketchMode) {
  return {
    [SKETCH_MODE_ADD_LINE]: ASSET_TYPE_CODE_LINE,
    [SKETCH_MODE_ADD_TRANSFORMER]: ASSET_TYPE_CODE_TRANSFORMER,
    [SKETCH_MODE_ADD_SUBSTATION]: ASSET_TYPE_CODE_SUBSTATION,
    [SKETCH_MODE_ADD_METER]: ASSET_TYPE_CODE_METER,
  }[sketchMode]
}

export function getAssetName(assetTypeCode, assetId) {
  const assetType = ASSET_TYPE_BY_CODE[assetTypeCode]
  const abbreviatedAssetId = assetId.substring(
    0, ABBREVIATED_ASSET_ID_LENGTH)
  return `${assetType.name} ${abbreviatedAssetId}`
}

export function getAssetTypeIcon(assetTypeCode) {
  return {
    [ASSET_TYPE_CODE_LINE]: LineIcon,
    [ASSET_TYPE_CODE_METER]: MeterIcon,
    [ASSET_TYPE_CODE_TRANSFORMER]: TransformerIcon,
    [ASSET_TYPE_CODE_SUBSTATION]: SubstationIcon,
  }[assetTypeCode]
}
