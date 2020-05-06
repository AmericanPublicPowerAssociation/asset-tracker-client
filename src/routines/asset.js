import {
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

export function makeAsset(
  feature,
) {
  const featureProperties = feature.properties
  const featureGeometry = feature.geometry
  const assetId = featureProperties.id
  const assetTypeCode = featureProperties.typeCode
  const connectionByIndex = {}
  const asset = {
    id: assetId,
    typeCode: assetTypeCode,
    name: assetId,
    connections: connectionByIndex,
  }
  const bus0Id = makeBusId()
  const bus1Id = makeBusId()

  switch (assetTypeCode) {
    case ASSET_TYPE_CODE_LINE: {
      const lastVertexIndex = featureGeometry.coordinates.length - 1
      connectionByIndex[0] = { busId: bus0Id }
      connectionByIndex[lastVertexIndex] = { busId: bus1Id }
      break
    }
    case ASSET_TYPE_CODE_METER: {
      connectionByIndex[0] = { busId: bus0Id }
      break
    }
    case ASSET_TYPE_CODE_TRANSFORMER: {
      connectionByIndex[0] = { busId: bus0Id }
      connectionByIndex[1] = { busId: bus1Id }
      break
    }
    default: {
      break
    }
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

export function getConnectedAssetCount(asset, assetIdsByBusId) {
  // TODO
  return 0
}

export function getConnectedAssetIds(assetId, busId, assetIdsByBusId) {
  return assetIdsByBusId[busId].filter(
    connectedAssetId => connectedAssetId !== assetId)
}
