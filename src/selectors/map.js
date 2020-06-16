import { createSelector } from 'reselect'
import {
  COLORS_BY_MAP_STYLE_NAME,
} from '../constants'

export const getMapStyleName = state => state.mapStyleName

export const getMapColors = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return COLORS_BY_MAP_STYLE_NAME[mapStyleName]
})
