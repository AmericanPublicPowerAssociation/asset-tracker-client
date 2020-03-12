import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  EditableGeoJsonLayer,
  ModifyMode,
  TranslateMode,
  ViewMode,
} from 'nebula.gl'
import {
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
  SKETCH_MODE_EDIT_MODIFY,
  SKETCH_MODE_EDIT_TRANSLATE,
} from '../constants'

export class CustomEditableGeoJsonLayer extends EditableGeoJsonLayer {
  getModeProps(props) {
    const modeProps = super.getModeProps(props)
    modeProps.onInterpret = props.onInterpret
    modeProps.handleOnDoubleClick = props.handleOnDoubleClick
    return modeProps
  }

  onDoubleClick(event) {
    const modeProps = this.getModeProps(this.props)
    const handleOnDoubleClick = modeProps.handleOnDoubleClick
    handleOnDoubleClick && handleOnDoubleClick(event, modeProps)
  }
}

export class CustomModifyMode extends ModifyMode {
  handleStopDragging(event, props) {
    super.handleStopDragging(event, props)
    props.onInterpret(event)
  }
}

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_LINE]: DrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawPolygonMode,
    [SKETCH_MODE_EDIT_MODIFY]: CustomModifyMode,
    [SKETCH_MODE_EDIT_TRANSLATE]: TranslateMode,
  }[sketchMode]
  return mapMode || ViewMode
}

export function getPickedVertex(event) {
  // Adapted from nebula.gl > mode-handler.js > getPickedEditHandle
  const picks = event.picks
  const info = picks && picks.find(pick => pick.isGuide)
  return info && info.object
}
