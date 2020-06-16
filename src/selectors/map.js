import { createSelector } from 'reselect'
import {
  COLORS_BY_MAP_STYLE_NAME,
  MAP_STYLE_BY_NAME,
} from '../constants'

export const getMapStyleName = state => state.mapStyleName
export const getMapViewState = state => state.mapViewState
export const getSketchMode = state => state.sketchMode
export const getPopUpState = state => state.popUpState
export const getSelectedAssetIndexes = state => state.selectedAssetIndexes
export const getSelectedBusIndexes = state => state.selectedBusIndexes

export const getMapColors = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return COLORS_BY_MAP_STYLE_NAME[mapStyleName]
})

export const getMapStyle = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return MAP_STYLE_BY_NAME[mapStyleName]
})
