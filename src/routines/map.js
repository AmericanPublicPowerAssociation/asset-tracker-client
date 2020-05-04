import {WebMercatorViewport} from '@deck.gl/core'
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

export function getPickedEditHandle(picks) {
  // Taken from nebula.gl > mode-handler.js
  const info = picks && picks.find(pick => pick.isGuide)
  if (info) {
    return info.object
  }
  return null
}

export function getMapviewFromBoudingBox(boundingBox, width, height) {
  const viewport = new WebMercatorViewport({ width, height })
  return (boundingBox.length > 0 ) && viewport.fitBounds(boundingBox, { padding: 20 })
}
