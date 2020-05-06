import { WebMercatorViewport } from '@deck.gl/core'
import {
  // EditableGeoJsonLayer,
} from '@nebula.gl/layers'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ModifyMode,
  ViewMode,
} from '@nebula.gl/edit-modes'
import {
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
  SKETCH_MODE_EDIT,
} from '../constants'

/*
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
*/

export function getMapMode(sketchMode) {
  const mapMode = {
    [SKETCH_MODE_ADD_LINE]: DrawLineStringMode,
    [SKETCH_MODE_ADD_METER]: DrawPointMode,
    [SKETCH_MODE_ADD_TRANSFORMER]: DrawPointMode,
    [SKETCH_MODE_ADD_SUBSTATION]: DrawPolygonMode,
    [SKETCH_MODE_EDIT]: ModifyMode,
  }[sketchMode]
  return mapMode || ViewMode
}

/*
export function getPickedEditHandle(picks) {
  // Taken from nebula.gl > mode-handler.js
  const info = picks && picks.find(pick => pick.isGuide)
  if (info) {
    return info.object
  }
  return null
}
*/

export function getMapViewStateFromBoundingBox(boundingBox, width, height) {
  if (!boundingBox.length) {
    return
  }
  const viewport = new WebMercatorViewport({ width, height })
  return viewport.fitBounds(boundingBox, { padding: 20 })
}
