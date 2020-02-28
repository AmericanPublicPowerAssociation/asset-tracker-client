import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
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

export class ModifyConnectionMode extends ModifyMode {

  handleStopDragging(event, props) {
    super.handleStopDragging(event, props)
    console.log('handleStopDragging', event, props)
  }

}

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_LINE]: DrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawPolygonMode,
    // [SKETCH_MODE_EDIT_MODIFY]: ModifyMode,
    [SKETCH_MODE_EDIT_MODIFY]: ModifyConnectionMode,
    [SKETCH_MODE_EDIT_TRANSLATE]: TranslateMode,
  }[sketchMode]
  return mapMode || ViewMode
}
