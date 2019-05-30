export const FEATURE_GEOMETRY_BY_ID = fromJS(
  assets.reduce(
    (o, x) => Object.assign(o, {[x.id]: x.geometry}), {}))
export const FEATURE_COLOR_ATTRIBUTE = 'typeId'
export const FEATURE_SIZE_ATTRIBUTE = 'KV'

export const KEY_PREFIX = 'asset-tracker-'
export const PROPERTY_MINIMUM_VALUE = 1
export const PROPERTY_MAXIMUM_VALUE = 9

export const CIRCUIT_DEPTH = 2
export const CYTOSCAPE_LAYOUT = {'name': 'cose'}
