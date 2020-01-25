import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ViewMode,
} from 'nebula.gl'
import {
  ADD_LINE,
  ADD_TRANSFORMER,
  ADD_SUBSTATION,
} from '../constants'

export function getMapMode(sketchMode) {
  const mapMode = {
    [ADD_LINE]: DrawLineStringMode,
    [ADD_TRANSFORMER]: DrawPointMode,
    [ADD_SUBSTATION]: DrawPolygonMode,
  }[sketchMode]
  return mapMode || ViewMode
}
