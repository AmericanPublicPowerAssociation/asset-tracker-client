import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  EditableGeoJsonLayer,
  ModifyMode,
  ViewMode,
} from 'nebula.gl'
import {
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
  SKETCH_MODE_EDIT_MODIFY,
} from '../constants'

export class CustomEditableGeoJsonLayer extends EditableGeoJsonLayer {
  getModeProps(props) {
    const modeProps = super.getModeProps(props)
    modeProps.onSelect = props.onSelect
    modeProps.onInterpret = props.onInterpret
    modeProps.onDoubleClick = props.onDoubleClick
    return modeProps
  }

  onDoubleClick(event) {
    const modeProps = this.getModeProps(this.props)
    const onDoubleClick = modeProps.onDoubleClick
    onDoubleClick && onDoubleClick(event, modeProps)
  }
}

export class CustomModifyMode extends ModifyMode {
  handleClick(event, props) {
    super.handleClick(event, props)
    props.onSelect(event)
  }

  handleStopDragging(event, props) {
    super.handleStopDragging(event, props)
    props.onInterpret(event)
  }
}

export class CustomViewMode extends ViewMode {
  handleClick(event, props) {
    super.handleClick(event, props)
    props.onSelect(event)
  }
}

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_LINE]: DrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawPolygonMode,
    [SKETCH_MODE_EDIT_MODIFY]: CustomModifyMode,
  }[sketchMode]
  return mapMode || CustomViewMode
}

export function getPickedInfo(event, {isGuide}) {
  const picks = event.picks
  return picks && picks.find(pick => pick.isGuide === isGuide)
}
