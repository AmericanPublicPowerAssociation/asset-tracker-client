import { createSelector } from '@reduxjs/toolkit'
import {
  COLORS_BY_MAP_STYLE_NAME,
} from '../constants'
import {
  getMapStyleName,
} from './map'

export const getColors = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return COLORS_BY_MAP_STYLE_NAME[mapStyleName]
})
