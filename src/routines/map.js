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
  SKETCH_MODE_ADD,
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

export function getAssetsMapLayer(
  assetsGeoJson,
  selectedAssetIndexes,
  colors,
  sketchMode, changeSketchMode,
  mapEditState, processMapEdit,
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

    if (mapEditState.withDoubleClick) {
      processMapEdit(mapEditState)

      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        changeSketchMode(SKETCH_MODE_ADD)
      }

      delete mapEditState.withDoubleClick
    }
  }

  function handleLayerDoubleClick(event) {
    console.log('layer double click', event)
    mapEditState.withDoubleClick = true
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
      return ASSET_RADIUS_IN_METERS_BY_CODE[feature.properties.typeCode]
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
