import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  EditableGeoJsonLayer,
  ModifyMode,
  ViewMode,
} from 'nebula.gl'
import {
  ASSETS_MAP_LAYER_ID,
  BUSES_MAP_LAYER_ID,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
  SKETCH_MODE_EDIT_MODIFY,
} from '../constants'

export class CustomEditableGeoJsonLayer extends EditableGeoJsonLayer {
  getModeProps(props) {
    const modeProps = super.getModeProps(props)
    // modeProps.onSelect = props.onSelect
    // modeProps.onInterpret = props.onInterpret
    modeProps.onDoubleClick = props.onDoubleClick
    return modeProps
  }

  onDoubleClick(event) {
    const modeProps = this.getModeProps(this.props)
    const onDoubleClick = modeProps.onDoubleClick
    onDoubleClick && onDoubleClick(event, modeProps)
  }
}

export class CustomDrawLineStringMode extends DrawLineStringMode {
  // handleClick(event, props) {
    // super.handleClick(event, props)
    // props.onInterpret(event)
  // }
}

export class CustomModifyMode extends ModifyMode {
  // handleClick(event, props) {
    // super.handleClick(event, props)
    // props.onSelect(event)
  // }

  // handleStopDragging(event, props) {
    // super.handleStopDragging(event, props)
    // props.onInterpret(event)
  // }
}

export class CustomViewMode extends ViewMode {
  // handleClick(event, props) {
    // super.handleClick(event, props)
    // props.onSelect(event)
  // }
}

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_LINE]: CustomDrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawPolygonMode,
    [SKETCH_MODE_EDIT_MODIFY]: CustomModifyMode,
  }[sketchMode]
  return mapMode || CustomViewMode
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
  sketchMode,
) {
  const mapMode = getMapMode(sketchMode)
  return new CustomEditableGeoJsonLayer({
    id: ASSETS_MAP_LAYER_ID,
    data: assetsGeoJson,
    mode: mapMode,
    selectedFeatureIndexes: selectedAssetIndexes,
  })
}

export function getBusesMapLayer(
  busesGeoJson,
  selectedBusIndexes,
) {
  return new EditableGeoJsonLayer({
    id: BUSES_MAP_LAYER_ID,
    data: busesGeoJson,
    mode: ViewMode,
    selectedBusIndexes: selectedBusIndexes,
  })
}
