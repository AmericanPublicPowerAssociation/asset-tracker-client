import {
  ASSET_TYPE_CODE_CONTROL,
  ASSET_TYPE_CODE_GENERATOR, ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_METER, ASSET_TYPE_CODE_POLE,
  ASSET_TYPE_CODE_POWER_QUALITY, ASSET_TYPE_CODE_STATION,
  ASSET_TYPE_CODE_STORAGE, ASSET_TYPE_CODE_SUBSTATION,
  ASSET_TYPE_CODE_SWITCH,
  ASSET_TYPE_CODE_TRANSFORMER,
} from './asset'
import DARK_MAP_STYLE from '../datasets/mapStyles/monochromeDark.json'
import STREET_MAP_STYLE from '../datasets/mapStyles/streets.json'
import SATELLITE_MAP_STYLE from '../datasets/mapStyles/satelliteStreets.json'

const TRANSPARENT_BLACK = [0, 0, 0, 128]
const TRANSPARENT_CYAN = [0, 255, 255, 128]
const TRANSPARENT_BLUE_GREY = [69, 90, 100, 200]
const TRANSPARENT_DEEP_PURPLE = [121, 76, 248, 160]
const TRANSPARENT_AMBER_COLOR = [255, 193, 7, 160]
const TRANSPARENT_TEAL_COLOR = [0, 150, 136, 255]
const TRANSPARENT_LIGHT_BLUE = [3, 169, 244, 160]
const TRANSPARENT_PURPLE_COLOR = [123, 31, 162, 200]
const TRANSPARENT_PINK_COLOR = [194, 24, 91, 160]
const TRANSPARENT_DEEP_ORANGE = [230, 74, 25, 160]
const TRANSPARENT_LIME_COLOR = [76, 175, 80, 160]
const SOMEWHAT_TRANSPARENT_BLACK = [0, 0, 0, 160]
const SOMEWHAT_TRANSPARENT_WHITE = [255, 255, 255, 160]
const SOMEWHAT_TRANSPARENT_MAGENTA = [255, 0, 255, 160]
const SOMEWHAT_TRANSPARENT_CYAN = [0, 255, 255, 160]
const SOMEWHAT_TRANSPARENT_YELLOW = [255, 255, 0, 160]
const SOLID_RED = [255, 0, 0, 255]
export const TRANSPARENT_WHITE = [255, 255, 255, 128]

export const COLORS_BY_ASSET = {
  dark: {
    [ASSET_TYPE_CODE_POLE]: TRANSPARENT_WHITE,
    [ASSET_TYPE_CODE_LINE]: TRANSPARENT_WHITE,
    [ASSET_TYPE_CODE_METER]: TRANSPARENT_DEEP_PURPLE,
    [ASSET_TYPE_CODE_TRANSFORMER]: TRANSPARENT_PINK_COLOR,
    [ASSET_TYPE_CODE_SWITCH]: TRANSPARENT_TEAL_COLOR,
    [ASSET_TYPE_CODE_POWER_QUALITY]: TRANSPARENT_LIGHT_BLUE,
    [ASSET_TYPE_CODE_CONTROL]: TRANSPARENT_PURPLE_COLOR,
    [ASSET_TYPE_CODE_STORAGE]: TRANSPARENT_LIME_COLOR,
    [ASSET_TYPE_CODE_GENERATOR]: TRANSPARENT_AMBER_COLOR,
    [ASSET_TYPE_CODE_SUBSTATION]: TRANSPARENT_WHITE,
    [ASSET_TYPE_CODE_STATION]: TRANSPARENT_BLUE_GREY
  }
}
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

export const MAP_VIEW_STATE = {
  longitude: -93.297,
  latitude: 37.180,
  zoom: 17,
  pitch: 0,
  bearing: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  altitude: 1.5,
}
export const SET_MAP_VIEW_STATE = 'SET_MAP_VIEW_STATE'

export const ASSETS_MAP_LAYER_ID = 'assets'
export const BUSES_MAP_LAYER_ID = 'buses'
export const ICONS_MAP_LAYER_ID = 'icons'

export const ASSET_LINE_WIDTH_IN_METERS = 5
export const ASSET_RADIUS_IN_METERS_BY_CODE = {
  [ASSET_TYPE_CODE_METER]: 5,
  [ASSET_TYPE_CODE_TRANSFORMER]: 7,
  [ASSET_TYPE_CODE_SWITCH]: 9,
  [ASSET_TYPE_CODE_POWER_QUALITY]: 11,
  [ASSET_TYPE_CODE_CONTROL]: 13,
  [ASSET_TYPE_CODE_STORAGE]: 15,
  [ASSET_TYPE_CODE_GENERATOR]: 17,
}
export const BUS_RADIUS_IN_METERS = 5
export const BUS_DISTANCE_IN_KILOMETERS_BY_CODE = Object.entries(
  ASSET_RADIUS_IN_METERS_BY_CODE,
).reduce((busDistanceInKilometersByCode, [
  typeCode,
  assetRadiusInMeters,
]) => {
  busDistanceInKilometersByCode[typeCode] = (
    assetRadiusInMeters + BUS_RADIUS_IN_METERS) / 1000
  return busDistanceInKilometersByCode
}, {})

export const OVERLAY_MODE_ASSETS = 'assets'
export const OVERLAY_MODE_TASKS = 'tasks'
export const OVERLAY_MODE_RISKS = 'risks'
export const OVERLAY_MODE = OVERLAY_MODE_ASSETS
export const SET_OVERLAY_MODE = 'SET_OVERLAY_MODE'

export const SKETCH_MODE_VIEW = 'view'
export const SKETCH_MODE_ADD = 'add'
export const SKETCH_MODE_ADD_ASSET = 'add >'
export const SKETCH_MODE_ADD_POLE = 'add > pole'
export const SKETCH_MODE_ADD_LINE = 'add > line'
export const SKETCH_MODE_ADD_METER = 'add > meter'
export const SKETCH_MODE_ADD_TRANSFORMER = 'add > transformer'
export const SKETCH_MODE_ADD_SWITCH = 'add > switch'
export const SKETCH_MODE_ADD_POWER_QUALITY = 'add > power quality'
export const SKETCH_MODE_ADD_CONTROL = 'add > control'
export const SKETCH_MODE_ADD_STORAGE = 'add > storage'
export const SKETCH_MODE_ADD_GENERATOR = 'add > generator'
export const SKETCH_MODE_ADD_SUBSTATION = 'add > substation'
export const SKETCH_MODE_ADD_STATION = 'add > station'
export const SKETCH_MODE_EDIT = 'edit'
export const SKETCH_MODE_EDIT_VERTEX_ADD = 'edit > add vertex'
export const SKETCH_MODE_EDIT_VERTEX_MOVE = 'edit > move vertex'
export const SKETCH_MODE_EDIT_VERTEX_REMOVE = 'edit > remove vertex'
export const SKETCH_MODE_EDIT_VERTEX_SPLIT_LINE = 'edit > split line vertex'
export const SKETCH_MODE_DELETE = 'delete'
export const SKETCH_MODE = SKETCH_MODE_VIEW
export const SET_SKETCH_MODE = 'SET_SKETCH_MODE'

export const POPUP_STATE = null
export const SET_POPUP_STATE = 'SET_POPUP_STATE'
export const SET_POPUP_DELETE_MIDPOINT = 'SET_POPUP_DELETE_MIDPOINT'
export const SET_SELECTION = 'SET_SELECTION'
export const SELECTED_ASSET_INDEXES = []
export const SELECTED_BUS_INDEXES = []
export const SET_SELECTED_ASSET_INDEXES = 'SET_SELECTED_ASSET_INDEXES'
export const SET_SELECTED_BUS_INDEXES = 'SET_SELECTED_BUS_INDEXES'
export const CENTER_MAP = 'CENTER_MAP'
