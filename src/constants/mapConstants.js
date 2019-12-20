import DARK_MAP_STYLE from '../datasets/mapStyles/monochromeDark.json'
import STREET_MAP_STYLE from '../datasets/mapStyles/streets.json'
import SATELLITE_MAP_STYLE from '../datasets/mapStyles/satelliteStreets.json'

export const MAP_VIEW_STATE = {
  // longitude: 0,
  // latitude: 0,
  // zoom: 0,
  longitude: -93.258,
  latitude: 37.244,
  zoom: 16,
  pitch: 0,
  bearing: 0,
  width: window.innerWidth,
  height: window.innerHeight,
}

export const MAP_STYLE_BY_NAME = {
  dark: DARK_MAP_STYLE,
  street: STREET_MAP_STYLE,
  satellite: SATELLITE_MAP_STYLE,
}
export const MAP_STYLE_NAMES = ['dark', 'street', 'satellite']
export const MAP_STYLE_COUNT = MAP_STYLE_NAMES.length
export const BRIGHT_MAP_STYLE_NAMES = ['street']

export const POINT_RADIUS_IN_METERS = 10
export const LINE_WIDTH_IN_METERS = 5
export const BUS_RADIUS_IN_METERS = 5
export const BUS_DISTANCE_IN_METERS = 15
export const BUS_DISTANCE_IN_KILOMETERS = BUS_DISTANCE_IN_METERS / 1000

export const TOGGLE_MAP_STYLE = 'TOGGLE_MAP_STYLE'
export const SET_MAP_VIEW_STATE = 'SET_MAP_VIEW_STATE'
