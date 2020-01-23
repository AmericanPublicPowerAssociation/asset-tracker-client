import { createSelector } from 'reselect'
import {
  COLORS_BY_MAP_STYLE_NAME,
} from '../constants'
import {
  getMapStyleName,
} from './mapSelectors'

export const getColors = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return COLORS_BY_MAP_STYLE_NAME[mapStyleName]
})

export const getAssetsColor = createSelector([
  getColors,
], (
  colors,
) => {
  return colors.assets
})

export const getBusesColor = createSelector([
  getColors,
], (
  colors,
) => {
  return colors.buses
})
