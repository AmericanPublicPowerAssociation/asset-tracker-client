import {
  ASSET_TYPE_CODE_CONTROL,
  ASSET_TYPE_CODE_GENERATOR,
  ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_POLE,
  ASSET_TYPE_CODE_POWER_QUALITY,
  ASSET_TYPE_CODE_STATION,
  ASSET_TYPE_CODE_STORAGE,
  ASSET_TYPE_CODE_SUBSTATION,
  ASSET_TYPE_CODE_SWITCH,
  ASSET_TYPE_CODE_TRANSFORMER,
  MINIMUM_ASSET_ID_LENGTH,
  SKETCH_MODE_ADD_CONTROL,
  SKETCH_MODE_ADD_GENERATOR,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_POLE,
  SKETCH_MODE_ADD_POWER_QUALITY,
  SKETCH_MODE_ADD_STATION,
  SKETCH_MODE_ADD_STORAGE,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_SWITCH,
  SKETCH_MODE_ADD_TRANSFORMER,
} from '../constants'
import {
  getLowerCaseFromCamelCase,
  getRandomId,
} from '../macros'
import {
  makeBusId,
} from '../routines'

export function getAssetTypeCode(sketchMode) {
  return {
    [SKETCH_MODE_ADD_POLE]: ASSET_TYPE_CODE_POLE,
    [SKETCH_MODE_ADD_LINE]: ASSET_TYPE_CODE_LINE,
    [SKETCH_MODE_ADD_METER]: ASSET_TYPE_CODE_METER,
    [SKETCH_MODE_ADD_TRANSFORMER]: ASSET_TYPE_CODE_TRANSFORMER,
    [SKETCH_MODE_ADD_SWITCH]: ASSET_TYPE_CODE_SWITCH,
    [SKETCH_MODE_ADD_POWER_QUALITY]: ASSET_TYPE_CODE_POWER_QUALITY,
    [SKETCH_MODE_ADD_CONTROL]: ASSET_TYPE_CODE_CONTROL,
    [SKETCH_MODE_ADD_STORAGE]: ASSET_TYPE_CODE_STORAGE,
    [SKETCH_MODE_ADD_GENERATOR]: ASSET_TYPE_CODE_GENERATOR,
    [SKETCH_MODE_ADD_SUBSTATION]: ASSET_TYPE_CODE_SUBSTATION,
    [SKETCH_MODE_ADD_STATION]: ASSET_TYPE_CODE_STATION,
  }[sketchMode]
}

export function makeAssetId() {
  return getRandomId(MINIMUM_ASSET_ID_LENGTH)
}

export function makeTemporaryAsset(utilityId, assetTypeCode) {
  const assetId = makeAssetId()
  const connectionByIndex = {}
  const asset = {
    id: assetId,
    utilityId,
    typeCode: assetTypeCode,
    name: assetId,
    connections: connectionByIndex,
  }
  const bus0Id = makeBusId()
  const bus1Id = makeBusId()

  switch (assetTypeCode) {
    case ASSET_TYPE_CODE_METER:
    case ASSET_TYPE_CODE_STORAGE:
    case ASSET_TYPE_CODE_GENERATOR: {
      connectionByIndex[0] = { busId: bus0Id }
      break
    }
    case ASSET_TYPE_CODE_TRANSFORMER:
    case ASSET_TYPE_CODE_SWITCH:
    case ASSET_TYPE_CODE_POWER_QUALITY:
    case ASSET_TYPE_CODE_CONTROL: {
      connectionByIndex[0] = { busId: bus0Id }
      connectionByIndex[1] = { busId: bus1Id }
      break
    }
    default: { }
  }

  return asset
}

export function getAssetDescription(assetId, assetById, assetTypeByCode) {
  let asset = assetById[assetId]
  if (!asset) {
    return null
  }
  const assetType = assetTypeByCode[asset.typeCode]
  return assetType.name + ' ' + asset.name
}

// TODO: Review all code below

export function getConnectedAssetIds(assetId, busId, assetIdsByBusId) {
  const assetIds = assetIdsByBusId[busId] || []
  return assetIds.filter(connectedAssetId => connectedAssetId !== assetId)
}

export function getAttributeLabel(attributeKey) {
  return getLowerCaseFromCamelCase(attributeKey).replace('percent', '%')
}

export function getSelectedAssetId(selectedAssetIndexes, assetsGeoJson) {
  const selectedAssetIndex = selectedAssetIndexes[0]
  const feature = assetsGeoJson.features[selectedAssetIndex]
  return feature && feature.properties.id
}

export function getConnectedAssetCount(asset, assetIdsByBusId) {
  // TODO
  return 0
}

export function getNewConnectionByIndex(
  connectionByIndex,
  afterIndex,
  indexOffset,
) {
  const newConnectionByIndex = {}
  for (const [oldIndex, oldConnection] of Object.entries(connectionByIndex)) {
    const newIndex = oldIndex > afterIndex ?
      parseInt(oldIndex) + indexOffset : oldIndex
    newConnectionByIndex[newIndex] = oldConnection
  }
  return newConnectionByIndex
}

// TODO: Review all code above
