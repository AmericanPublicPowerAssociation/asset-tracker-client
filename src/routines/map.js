import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  EditableGeoJsonLayer,
  ModifyMode,
  ViewMode,
} from 'nebula.gl'
import {
  ASSET_RADIUS_IN_METERS_BY_CODE,
  ASSETS_MAP_LAYER_ID,
  ASSET_LINE_WIDTH_IN_METERS,
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
  SKETCH_MODE_EDIT_MODIFY,
} from '../constants'

export class CustomEditableGeoJsonLayer extends EditableGeoJsonLayer {
  onDoubleClick(event) {
    const props = this.props
    super.onDoubleClick(event, props)
    const onDoubleClick = props.onDoubleClick
    onDoubleClick && onDoubleClick(event, props)
  }

  onStopDragging(event) {
    const props = this.props
    super.onStopDragging(event, props)
    const onStopDragging = props.onStopDragging
    onStopDragging && onStopDragging(event, props)
  }
}

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_LINE]: DrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawPolygonMode,
    [SKETCH_MODE_EDIT_MODIFY]: ModifyMode,
  }[sketchMode]
  return mapMode || ViewMode
}

export function getPickedFeature(event, select) {
  const info = getPickedInfo(event, select)
  if (!info) {
    return
  }
  const layer = info.layer
  const index = info.index
  return layer.props.data.features[index]
}

export function getPickedInterpretation(event, getBusId) {
  const thisGuideInfo = getPickedInfo(event, pick => pick.isGuide)
  if (!thisGuideInfo) {
    return {thatAssetId: getPickedAssetId(event)}
  }

  const assetFeatures = thisGuideInfo.layer.props.data.features
  const thisGuideFeature = thisGuideInfo.object
  const thisGuideFeatureProperties = thisGuideFeature.properties
  const thisAssetFeatureIndex = thisGuideFeatureProperties.featureIndex
  const thisAssetFeature = assetFeatures[thisAssetFeatureIndex]
  if (!thisAssetFeature) {
    return {thatAssetId: getPickedAssetId(event)}
  }
  const thisAssetId = thisAssetFeature.properties.id

  const thisGuideFeatureIndex = thisGuideFeatureProperties.positionIndexes[0]
  const connectionIndex = thisGuideFeatureIndex === 0 ? 0 : 1

  const busId = getBusId(event, thisAssetId)
  const thatAssetFeatureInfo = getPickedInfo(event, pick =>
    !pick.isGuide && pick.index !== thisAssetFeatureIndex)

  let thatAssetId
  if (thatAssetFeatureInfo) {
    const thatAssetFeatureIndex = thatAssetFeatureInfo.index
    const thatAssetFeature = assetFeatures[thatAssetFeatureIndex]
    thatAssetId = thatAssetFeature.properties.id
  }

  return {busId, connectionIndex, thisAssetId, thatAssetId}
}

export function getPickedAssetId(event) {
  const assetFeatureInfo = getPickedInfo(event, pick => !pick.isGuide)
  let assetId = null
  if (assetFeatureInfo) {
    const assetFeatures = assetFeatureInfo.layer.props.data.features
    const assetFeatureIndex = assetFeatureInfo.index
    const assetFeature = assetFeatures[assetFeatureIndex]
    assetId = assetFeature.properties.id
  }
  return assetId
}

export function getPickedInfo(event, select) {
  const picks = event.picks
  return picks && picks.find(select)
}

export function getAssetsMapLayer(
  assetsGeoJson,
  selectedAssetIndexes,
  colors,
  sketchMode,
  mapEditState,
) {
  const mapMode = getMapMode(sketchMode)

  function handleAssetClick(info, event) {
    console.log('asset click', info, event)
  }

  function handleAssetEdit({editType, editContext, updatedData}) {
    console.log('asset edit', editType, editContext, updatedData)
    mapEditState.editType = editType
    mapEditState.editContext = editContext
    mapEditState.updatedData = updatedData
  }

  function handleLayerDoubleClick(event) {
    console.log('layer double click', event)
  }

  function handleLayerStopDragging(event) {
    console.log('layer stop dragging', event)
  }

  return new CustomEditableGeoJsonLayer({
    id: ASSETS_MAP_LAYER_ID,
    data: assetsGeoJson,
    mode: mapMode,
    selectedFeatureIndexes: selectedAssetIndexes,
    autoHighlight: true,
    highlightColor: colors.assetHighlight,
    pickable: true,
    stroked: false,
    getRadius: feature => {
      const assetTypeCode = feature.properties.typeCode
      return ASSET_RADIUS_IN_METERS_BY_CODE[assetTypeCode]
    },
    getLineWidth: ASSET_LINE_WIDTH_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    getLineColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    onClick: handleAssetClick,
    onEdit: handleAssetEdit,
    onDoubleClick: handleLayerDoubleClick,
    onStopDragging: handleLayerStopDragging,
  })
}

export function getBusesMapLayer(
  busesGeoJson,
  selectedBusIndexes,
  colors,
) {

  function handleBusClick(info, event) {
    console.log('bus click', info, event)
  }

  return new EditableGeoJsonLayer({
    id: BUSES_MAP_LAYER_ID,
    data: busesGeoJson,
    mode: ViewMode,
    selectedBusIndexes: selectedBusIndexes,
    autoHighlight: true,
    highlightColor: colors.busHighlight,
    pickable: true,
    stroked: false,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.busSelect : colors.bus
    },
    onClick: handleBusClick,
  })
}
