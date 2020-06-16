import DARK_MAP_STYLE from '../datasets/mapStyles/monochromeDark.json'
import STREET_MAP_STYLE from '../datasets/mapStyles/streets.json'
import SATELLITE_MAP_STYLE from '../datasets/mapStyles/satelliteStreets.json'

const TRANSPARENT_BLACK = [0, 0, 0, 128]
const TRANSPARENT_WHITE = [255, 255, 255, 128]
const TRANSPARENT_CYAN = [0, 255, 255, 128]
const SOMEWHAT_TRANSPARENT_BLACK = [0, 0, 0, 160]
const SOMEWHAT_TRANSPARENT_WHITE = [255, 255, 255, 160]
const SOMEWHAT_TRANSPARENT_MAGENTA = [255, 0, 255, 160]
const SOMEWHAT_TRANSPARENT_CYAN = [0, 255, 255, 160]
const SOMEWHAT_TRANSPARENT_YELLOW = [255, 255, 0, 160]
const SOLID_RED = [255, 0, 0, 255]

export const COLORS_BY_MAP_STYLE_NAME = {
  dark: {
    active: 'white',
    inactive: 'gray',
    asset: TRANSPARENT_WHITE,
    assetHighlight: SOMEWHAT_TRANSPARENT_WHITE,
    assetSelect: SOMEWHAT_TRANSPARENT_MAGENTA,
    bus: TRANSPARENT_CYAN,
    busHighlight: SOMEWHAT_TRANSPARENT_CYAN,
    busSelect: SOMEWHAT_TRANSPARENT_YELLOW,
    overlay: SOLID_RED,
  },
  street: {
    active: 'black',
    inactive: 'gray',
    asset: TRANSPARENT_BLACK,
    assetHighlight: SOMEWHAT_TRANSPARENT_BLACK,
    assetSelect: SOMEWHAT_TRANSPARENT_MAGENTA,
    bus: TRANSPARENT_CYAN,
    busHighlight: SOMEWHAT_TRANSPARENT_CYAN,
    busSelect: SOMEWHAT_TRANSPARENT_YELLOW,
    overlay: SOLID_RED,
  },
  satellite: {
    active: 'white',
    inactive: 'gray',
    asset: TRANSPARENT_WHITE,
    assetHighlight: SOMEWHAT_TRANSPARENT_WHITE,
    assetSelect: SOMEWHAT_TRANSPARENT_MAGENTA,
    bus: TRANSPARENT_CYAN,
    busHighlight: SOMEWHAT_TRANSPARENT_CYAN,
    busSelect: SOMEWHAT_TRANSPARENT_YELLOW,
    overlay: SOLID_RED,
  },
}

export const MAP_STYLE_BY_NAME = {
  dark: DARK_MAP_STYLE,
  street: STREET_MAP_STYLE,
  satellite: SATELLITE_MAP_STYLE,
}
export const MAP_STYLE_NAMES = Object.keys(MAP_STYLE_BY_NAME)
export const MAP_STYLE_COUNT = MAP_STYLE_NAMES.length
export const TOGGLE_MAP_STYLE = 'TOGGLE_MAP_STYLE'

export const SKETCH_MODE_VIEW = 'view'
export const SKETCH_MODE = SKETCH_MODE_VIEW
export const SET_SKETCH_MODE = 'SET_SKETCH_MODE'
