import { fromJS } from 'immutable'
import assets from '../datasets/assets.json'
// import mapStyle from '../datasets/map-style-streets.json'
import mapStyle from '../datasets/map-style-satellite-streets.json'

export const CONTENT_PADDING = 24

export const INFORMATION_DRAWER_WIDTH = 512
export const FILTER_LIST_DRAWER_WIDTH = 256

export const ADD_ASSET = 'ADD_ASSET'
export const UPDATE_ASSET = 'UPDATE_ASSET'

export const UPDATE_ASSET_LOCATION = 'UPDATE_ASSET_LOCATION'
export const UPDATE_ASSET_GEOMETRY = 'UPDATE_ASSET_GEOMETRY'

export const TOGGLE_ASSET_RELATION = 'TOGGLE_ASSET_RELATION'

export const ADD_SELECTED_ASSET_TYPE = 'ADD_SELECTED_ASSET_TYPE'
export const TOGGLE_SELECTED_ASSET_TYPE = 'TOGGLE_SELECTED_ASSET_TYPE'
export const SET_SELECTED_ASSET_IDS = 'SET_SELECTED_ASSET_IDS'

export const SET_FOCUSING_ASSET = 'SET_FOCUSING_ASSET'
export const SET_RELATING_ASSET = 'SET_RELATING_ASSET'
export const SET_LOCATING_ASSET = 'SET_LOCATING_ASSET'

export const ASSET_TYPE_BY_ID = {
  p: {
    name: 'Pole',
    connectedIds: [],
    parentIds: ['l', 's', 'S'],
    childIds: ['m', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    locatable: true,
  },
  l: {
    name: 'Line',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: [],
    childIds: ['p'],
  },
  m: {
    name: 'Meter',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    subTypes: [
      {id: 'mr', name: 'Residential'},
      {id: 'mc', name: 'Commercial'},
      {id: 'mi', name: 'Industrial'},
      {id: 'mX', name: 'Other'},
    ],
    locatable: true,
  },
  t: {
    name: 'Transformer',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p'],
    childIds: [],
    subTypes: [
      {id: 'td', name: 'Distribution'},
      {id: 'tp', name: 'Power'},
      {id: 'tX', name: 'Other'},
    ],
  },
  x: {
    name: 'Switch',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    subTypes: [
      {id: 'xf', name: 'Fuse'},
      {id: 'xb', name: 'Breaker'},
      {id: 'xc', name: 'Recloser'},
      {id: 'xi', name: 'Interrupter'},
      {id: 'xs', name: 'Sectionalizer'},
      {id: 'xr', name: 'Relay'},
      {id: 'xX', name: 'Other'},
    ],
  },
  q: {
    name: 'Power Quality',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    subTypes: [
      {id: 'qc', name: 'Capacitor'},
      {id: 'qr', name: 'Regulator'},
      {id: 'qb', name: 'Booster'},
      {id: 'qX', name: 'Other'},
    ],
  },
  c: {
    name: 'Control',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    subTypes: [
      {id: 'cp', name: 'PLC'},
      {id: 'cm', name: 'Microcontroller'},
      {id: 'cX', name: 'Other'},
    ],
  },
  b: {
    name: 'Busbar',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
  },
  o: {
    name: 'Storage',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    locatable: true,
  },
  g: {
    name: 'Generator',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    locatable: true,
  },
  s: {
    name: 'Substation',
    connectedIds: [],
    parentIds: [],
    childIds: ['p', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    subTypes: [
      {id: 'sd', name: 'Distribution'},
      {id: 'st', name: 'Transmission'},
      {id: 'sX', name: 'Other'},
    ],
    locatable: true,
    unique: true,
  },
  S: {
    name: 'Station',
    connectedIds: [],
    parentIds: [],
    childIds: ['p', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    locatable: true,
    unique: true,
  },
  X: {
    name: 'Other',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    locatable: true,
  },
}
// export const SELECTED_ASSET_TYPE_IDS = fromJS(['l', 'm', 'x', 's'])
export const SELECTED_ASSET_TYPE_IDS = fromJS(['l'])
export const DEFAULT_ASSET_TYPE_ID = 'p'

export const ASSET_BY_ID = fromJS(
  assets.reduce((o, x) => Object.assign(o, {[x.id]: {
    ...x,
    typeId: x.typeId[0],
  }}), {}))
export const SORTED_ASSET_IDS = fromJS(assets.map(asset => asset['id']))
export const MAXIMUM_LIST_LENGTH = 50

export const ASSET_LOCATION_BY_ID = fromJS(
  assets.filter(x => x.location).reduce(
    (o, x) => Object.assign(o, {[x.id]: x.location}), {}))
export const FEATURE_GEOMETRY_BY_ID = fromJS(
  assets.reduce(
    (o, x) => Object.assign(o, {[x.id]: x.geometry}), {}))
export const FEATURE_COLOR_ATTRIBUTE = 'typeId'
export const FEATURE_SIZE_ATTRIBUTE = 'KV'
export const MAP_STYLE = fromJS(mapStyle)
export const KEY_PREFIX = 'asset-tracker-'
export const PROPERTY_MINIMUM_VALUE = 1
export const PROPERTY_MAXIMUM_VALUE = 9

export const CIRCUIT_DEPTH = 2
export const CYTOSCAPE_LAYOUT = {'name': 'cose'}
export const DEBOUNCE_THRESHOLD_IN_MILLISECONDS = 100

export const TOOLTIP_DELAY = 500
