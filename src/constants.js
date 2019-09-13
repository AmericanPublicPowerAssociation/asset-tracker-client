import { fromJS } from 'immutable'
import darkMapStyle from './datasets/darkMapStyle.json'
// import streetsMapStyle from './datasets/streetsMapStyle.json'
import satelliteStreetsMapStyle from './datasets/satelliteStreetsMapStyle.json'


export const NAVIGATION_DRAWER_WIDTH = 192
export const INFORMATION_DRAWER_WIDTH = 512
export const RIGHT_DRAWER_MINIMUM_WIDTH = 256


export const MAXIMUM_ASSET_LIST_LENGTH = 100
export const TOOLTIP_DELAY = 500
export const DEBOUNCE_THRESHOLD_IN_MILLISECONDS = 100


export const LOG_ERROR = 'LOG_ERROR'


export const REFRESH_DASHBOARDS = 'REFRESH_DASHBOARDS'
export const REFRESH_ASSETS_KIT = 'REFRESH_ASSETS_KIT'
export const REFRESH_ASSETS_LOGS = 'REFRESH_ASSETS_LOGS'
export const REFRESH_TASKS = 'REFRESH_TASKS'
export const ADD_ASSET = 'ADD_ASSET'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_ASSET = 'CHANGE_ASSET'


export const ADD_ASSET_RELATION = 'ADD_ASSET_RELATION'
export const DROP_ASSET_RELATION = 'DROP_ASSET_RELATION'


export const RESET_DASHBOARDS = 'RESET_DASHBOARDS'
export const RESET_ASSETS_KIT = 'RESET_ASSETS_KIT'
export const RESET_ASSETS_LOGS = 'RESET_ASSETS_LOGS'
export const RESET_TASKS = 'RESET_TASKS'
export const SET_ASSETS = 'SET_ASSETS'
export const SET_SORTED_ASSETS = 'SET_SORTED_ASSETS'

export const SET_ASSET = 'SET_ASSET'
export const SET_TASK = 'SET_TASK'
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
export const TOGGLE_SELECTED_ASSET = 'TOGGLE_SELECTED_ASSET'


export const OPEN_ASSET_ADD_DIALOG = 'OPEN_ASSET_ADD_DIALOG'
export const CLOSE_ASSET_ADD_DIALOG = 'CLOSE_ASSET_ADD_DIALOG'
export const SET_ADDING_ASSET_VALUE = 'SET_ADDING_ASSET_VALUE'
export const SET_ADDING_ASSET_ERRORS = 'SET_ADDING_ASSET_ERRORS'

export const OPEN_TASK_ADD_DIALOG = 'OPEN_TASK_ADD_DIALOG'
export const CLOSE_TASK_ADD_DIALOG = 'CLOSE_TASK_ADD_DIALOG'
export const SET_ADDING_TASK_VALUE = 'SET_ADDING_TASK_VALUE'
export const SET_ADDING_TASK_ERRORS = 'SET_ADDING_TASK_ERRORS'

export const OPEN_ASSETS_UPLOAD_DIALOG = 'OPEN_ASSETS_UPLOAD_DIALOG'
export const CLOSE_ASSETS_UPLOAD_DIALOG = 'CLOSE_ASSETS_UPLOAD_DIALOG'
export const UPLOAD_ASSETS_CSV = 'UPLOAD_ASSETS_CSV'
export const DOWNLOAD_ASSETS_CSV = 'DOWNLOAD_ASSETS_CSV'
export const SET_ASSET_CSV_FILE = 'SET_ASSET_CSV_FILE'
export const SET_ADDING_CSV_ASSETS_ERRORS = 'SET_ADDING_CSV_ASSETS_ERRORS'
export const HIDE_ADDING_CSV_ASSETS_ERRORS = 'HIDE_ADDING_CSV_ASSETS_ERRORS'

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
