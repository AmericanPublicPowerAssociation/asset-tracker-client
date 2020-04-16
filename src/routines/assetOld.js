import {
  ABBREVIATED_ASSET_ID_LENGTH,
  ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_SUBSTATION,
  ASSET_TYPE_CODE_TRANSFORMER,
  MINIMUM_ASSET_ID_LENGTH,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
} from '../constants'
import {
  expandCamelCase,
  getRandomId,
} from '../macros'
import {
  makeBusId,
} from '../routines'

export function makeAsset(assetId, assetType) {
  const assetName = getAssetName(assetType, assetId)
  const assetTypeCode = assetType.code
  const asset = {id: assetId, typeCode: assetTypeCode, name: assetName}

  switch (assetTypeCode) {
    case ASSET_TYPE_CODE_LINE: {
<<<<<<< HEAD
=======
      if (Array.isArray(lineBusId)) {
        asset.connections = lineBusId
      } else {
        const busId = lineBusId || getRandomId(MINIMUM_BUS_ID_LENGTH)
        asset.connections = [{busId}]
      }
      break
    }
    case ASSET_TYPE_CODE_TRANSFORMER: {
>>>>>>> feature/split-line
      asset.connections = [
        {busId: makeBusId()},
        {busId: makeBusId()},
      ]
      break
    }
    case ASSET_TYPE_CODE_METER: {
      asset.connections = [
        {busId: makeBusId()},
      ]
      break
    }
    case ASSET_TYPE_CODE_TRANSFORMER: {
      asset.connections = [
        {busId: makeBusId()},
        {busId: makeBusId()},
      ]
      break
    }
    default: { }
  }

  return asset
}

/*
export function makeAsset(assetType, lineBusId) {
  case ASSET_TYPE_CODE_LINE: {
    const busId = lineBusId || getRandomId(MINIMUM_BUS_ID_LENGTH)
    asset.connections = [{busId}]
  }
}
*/

export function getAssetTypeCode(sketchMode) {
  return {
    [SKETCH_MODE_ADD_LINE]: ASSET_TYPE_CODE_LINE,
    [SKETCH_MODE_ADD_TRANSFORMER]: ASSET_TYPE_CODE_TRANSFORMER,
    [SKETCH_MODE_ADD_SUBSTATION]: ASSET_TYPE_CODE_SUBSTATION,
    [SKETCH_MODE_ADD_METER]: ASSET_TYPE_CODE_METER,
  }[sketchMode]
}

export function getAssetName(assetType, assetId) {
  const abbreviatedAssetId = assetId.substring(
    0, ABBREVIATED_ASSET_ID_LENGTH)
  return `${assetType.name} ${abbreviatedAssetId}`
}

export function getAttributeLabel(attributeKey) {
  return expandCamelCase(attributeKey).replace('percent', '%')
}

export function getSelectedAssetId(selectedAssetIndexes, assetsGeoJson) {
  const selectedAssetIndex = selectedAssetIndexes[0]
  const feature = assetsGeoJson.features[selectedAssetIndex]
  return feature && feature.properties.id
}

export function makeAssetId() {
  return getRandomId(MINIMUM_ASSET_ID_LENGTH)
}
