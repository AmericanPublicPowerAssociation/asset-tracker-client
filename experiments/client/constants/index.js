import streetsMapStyle from '../datasets/map-style-streets.json'
import satelliteStreetsMapStyle from '../datasets/map-style-satellite-streets.json'

export const INFORMATION_DRAWER_WIDTH = 512

export const SELECTED_ASSET_TYPE_IDS = fromJS(['l'])

export const ASSET_LOCATION_BY_ID = fromJS(
  assets.filter(x => x.location).reduce(
    (o, x) => Object.assign(o, {[x.id]: x.location}), {}))
export const FEATURE_GEOMETRY_BY_ID = fromJS(
  assets.reduce(
    (o, x) => Object.assign(o, {[x.id]: x.geometry}), {}))
export const FEATURE_COLOR_ATTRIBUTE = 'typeId'
export const FEATURE_SIZE_ATTRIBUTE = 'KV'
export const STREETS_MAP_STYLE = fromJS(streetsMapStyle)
export const SATELLITE_STREETS_MAP_STYLE = fromJS(satelliteStreetsMapStyle)
export const MAP_VIEWPORT = fromJS({
  longitude: -79.62399908012085,
  latitude: 36.1931536309396,
  zoom: 13,
  pitch: 0,
  bearing: 0,
})
export const KEY_PREFIX = 'asset-tracker-'
export const PROPERTY_MINIMUM_VALUE = 1
export const PROPERTY_MAXIMUM_VALUE = 9

export const CIRCUIT_DEPTH = 2
export const CYTOSCAPE_LAYOUT = {'name': 'cose'}
export const DEBOUNCE_THRESHOLD_IN_MILLISECONDS = 100

