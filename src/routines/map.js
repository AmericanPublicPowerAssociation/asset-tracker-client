import {
  DrawCircleByDiameterMode,
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  DrawRectangleMode,
  ModifyMode,
  ViewMode,
} from '@nebula.gl/edit-modes'
import {
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
  SKETCH_MODE_EDIT,
} from '../constants'

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_POLE]: DrawCircleByDiameterMode,
    [SKETCH_MODE_ADD_LINE]: DrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SWITCH]: DrawPointMode,
    [SKETCH_MODE_ADD_POWER_QUALITY]: DrawPointMode,
    [SKETCH_MODE_ADD_CONTROL]: DrawPointMode,
    [SKETCH_MODE_ADD_STORAGE]: DrawPointMode,
    [SKETCH_MODE_ADD_GENERATOR]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawRectangleMode,
    [SKETCH_MODE_ADD_STATION]: DrawPolygonMode,
    [SKETCH_MODE_EDIT]: ModifyMode,
  }[sketchMode]
  return mapMode || ViewMode
}
