import {
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_TRANSFORMER,
} from './asset'

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

export const ASSET_RADIUS_IN_METERS_BY_CODE = {
  [ASSET_TYPE_CODE_METER]: 5,
  [ASSET_TYPE_CODE_TRANSFORMER]: 10,
}
export const ASSET_LINE_WIDTH_IN_METERS = 5
export const BUS_RADIUS_IN_METERS = 5
export const BUS_DISTANCE_IN_METERS = 15
export const BUS_DISTANCE_IN_KILOMETERS = BUS_DISTANCE_IN_METERS / 1000
export const BUS_DISTANCE_IN_KILOMETERS_FOR_METERS = 10 / 1000

export const PICKING_RADIUS_IN_PIXELS = Math.max(
  ...Object.values(ASSET_RADIUS_IN_METERS_BY_CODE)) + 1
export const PICKING_DEPTH = 5

export const TOGGLE_MAP_STYLE = 'TOGGLE_MAP_STYLE'
export const SET_MAP_VIEW_STATE = 'SET_MAP_VIEW_STATE'

export const ASSETS_MAP_LAYER_ID = 'assets'
export const BUSES_MAP_LAYER_ID = 'buses'
