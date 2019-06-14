import { fromJS } from 'immutable'
import darkMapStyle from './datasets/darkMapStyle.json'
// import streetsMapStyle from './datasets/streetsMapStyle.json'
import satelliteStreetsMapStyle from './datasets/satelliteStreetsMapStyle.json'


export const CONTENT_PADDING = 24
export const NAVIGATION_DRAWER_WIDTH = 192
export const INFORMATION_DRAWER_WIDTH = 512
export const RIGHT_DRAWER_MINIMUM_WIDTH = 256


export const MAXIMUM_ASSET_LIST_LENGTH = 100
export const TOOLTIP_DELAY = 500
export const DEBOUNCE_THRESHOLD_IN_MILLISECONDS = 100


export const LOG_ERROR = 'LOG_ERROR'


export const REFRESH_ASSET_TYPES = 'REFRESH_ASSET_TYPES'
export const REFRESH_ASSETS = 'REFRESH_ASSETS'
export const ADD_ASSET = 'ADD_ASSET'
export const CHANGE_ASSET = 'CHANGE_ASSET'


export const ADD_ASSET_RELATION = 'ADD_ASSET_RELATION'
export const DROP_ASSET_RELATION = 'DROP_ASSET_RELATION'


export const RESET_ASSET_TYPES = 'RESET_ASSET_TYPES'
export const RESET_ASSETS = 'RESET_ASSETS'
export const SET_ASSETS = 'SET_ASSETS'

export const SET_ASSET = 'SET_ASSET'
export const MERGE_ASSET = 'MERGE_ASSET'

export const SET_ASSET_ERRORS = 'SET_ASSET_ERRORS'
export const SET_ASSET_LOCATION = 'SET_ASSET_LOCATION'


export const CLOSE_INFORMATION_DRAWER = 'CLOSE_INFORMATION_DRAWER'
export const CLOSE_NAVIGATION_DRAWER = 'CLOSE_NAVIGATION_DRAWER'
export const OPEN_INFORMATION_DRAWER = 'OPEN_INFORMATION_DRAWER'
export const OPEN_NAVIGATION_DRAWER = 'OPEN_NAVIGATION_DRAWER'
export const SET_APP_VALUE = 'SET_APP_VALUE'
export const TOGGLE_THEME = 'TOGGLE_THEME'


export const EXCLUDE_ASSET_RELATION = 'EXCLUDE_ASSET_RELATION'
export const INCLUDE_ASSET_RELATION = 'INCLUDE_ASSET_RELATION'


export const SET_ASSET_FILTER_VALUE = 'SET_ASSET_FILTER_VALUE'


export const EXCLUDE_ASSET_FILTER_KEY = 'EXCLUDE_ASSET_FILTER_KEY'
export const INCLUDE_ASSET_FILTER_KEY = 'INCLUDE_ASSET_FILTER_KEY'
export const SET_ASSET_FILTER_KEYS = 'SET_ASSET_FILTER_KEYS'
export const TOGGLE_ASSET_FILTER_KEY = 'TOGGLE_ASSET_FILTER_KEY'


export const SET_FOCUSING_ASSET = 'SET_FOCUSING_ASSET'
export const SET_RELATING_ASSET = 'SET_RELATING_ASSET'
export const SET_LOCATING_ASSET = 'SET_LOCATING_ASSET'


export const OPEN_ASSET_ADD_DIALOG = 'OPEN_ASSET_ADD_DIALOG'
export const CLOSE_ASSET_ADD_DIALOG = 'CLOSE_ASSET_ADD_DIALOG'
export const SET_ADDING_ASSET_VALUE = 'SET_ADDING_ASSET_VALUE'
export const SET_ADDING_ASSET_ERRORS = 'SET_ADDING_ASSET_ERRORS'


export const SET_MAP_VIEWPORT = 'SET_MAP_VIEWPORT'


export const DEFAULT_ASSET_TYPE_ID = 'p'
export const SELECTED_ASSET_TYPE_IDS = ['l']


export const DARK_MAP_STYLE = fromJS(darkMapStyle)
// export const STREETS_MAP_STYLE = fromJS(streetsMapStyle)
export const SATELLITE_STREETS_MAP_STYLE = fromJS(satelliteStreetsMapStyle)
export const BASE_MAP_STYLE_NAME = 'dark'
export const KEY_PREFIX = 'asset-tracker-'
export const FOCUSING_COLOR = 'cyan'
export const EDITING_COLOR = 'red'
export const SELECTED_COLOR = 'lime'
