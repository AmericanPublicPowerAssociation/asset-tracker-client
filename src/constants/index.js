import assetTypeById from '../datasets/assetTypeById.json'


export const CONTENT_PADDING = 24
export const NAVIGATION_DRAWER_WIDTH = 192
export const INFORMATION_DRAWER_WIDTH = 512
export const RIGHT_DRAWER_MINIMUM_WIDTH = 256


export const MAXIMUM_ASSET_LIST_LENGTH = 100
export const TOOLTIP_DELAY = 500
export const DEBOUNCE_THRESHOLD_IN_MILLISECONDS = 100


export const SERVER = 'SERVER'
export const SERVER_ASSETS_URL = '/assets.json'
export const SERVER_ASSET_URL = '/assets/_.json'


export const REFRESH_ASSETS = 'REFRESH_ASSETS'
export const ADD_ASSET = 'ADD_ASSET'
export const UPDATE_ASSET = 'UPDATE_ASSET'
export const REPLACE_ASSET = 'REPLACE_ASSET'
export const REPLACE_ASSETS = 'REPLACE_ASSETS'
export const SET_ASSET_NAME_QUERY = 'SET_ASSET_NAME_QUERY'
export const TOGGLE_SELECTED_ASSET_TYPE = 'TOGGLE_SELECTED_ASSET_TYPE'
export const ADD_SELECTED_ASSET_TYPE = 'ADD_SELECTED_ASSET_TYPE'
export const SET_FOCUSING_ASSET = 'SET_FOCUSING_ASSET'


export const ASSET_TYPE_BY_ID = assetTypeById
export const DEFAULT_ASSET_TYPE_ID = 'p'
export const SELECTED_ASSET_TYPE_IDS = ['l']
