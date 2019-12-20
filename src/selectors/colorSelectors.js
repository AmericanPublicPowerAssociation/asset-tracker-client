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
