import DARK_MAP_STYLE from '../datasets/mapStyles/monochromeDark.json'
import STREET_MAP_STYLE from '../datasets/mapStyles/streets.json'
import SATELLITE_MAP_STYLE from '../datasets/mapStyles/satelliteStreets.json'

export const MAP_STYLE_BY_NAME = {
  dark: DARK_MAP_STYLE,
  street: STREET_MAP_STYLE,
  satellite: SATELLITE_MAP_STYLE,
}
export const MAP_STYLE_NAMES = ['dark', 'street', 'satellite']
export const MAP_STYLE_COUNT = MAP_STYLE_NAMES.length
export const BRIGHT_MAP_STYLE_NAMES = ['street']

export const TOGGLE_MAP_STYLE = 'TOGGLE_MAP_STYLE'
export const SET_MAP_VIEW_STATE = 'SET_MAP_VIEW_STATE'