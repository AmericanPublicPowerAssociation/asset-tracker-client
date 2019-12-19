import DARK_MAP_STYLE from '../datasets/mapStyles/monochromeDark.json'
import STREET_MAP_STYLE from '../datasets/mapStyles/streets.json'
import SATELLITE_MAP_STYLE from '../datasets/mapStyles/satelliteStreets.json'

export const MAP_STYLE_BY_NAME = {
  dark: DARK_MAP_STYLE,
  street: STREET_MAP_STYLE,
  satellite: SATELLITE_MAP_STYLE,
}
export const BRIGHT_MAP_STYLE_NAMES = [
  'street',
]
export const NEXT_MAP_STYLE_NAME_BY_MAP_STYLE_NAME = {
  dark: 'street',
  street: 'satellite',
  satellite: 'dark',
}
export const MAP_STYLE_NAME = 'dark'

export const SET_MAP_VIEW_STATE = 'SET_MAP_VIEW_STATE'
