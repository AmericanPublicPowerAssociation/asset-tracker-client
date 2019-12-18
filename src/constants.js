import darkMapStyle from './datasets/darkMapStyle.json'
import streetsMapStyle from './datasets/streetsMapStyle.json'
import satelliteStreetsMapStyle from './datasets/satelliteStreetsMapStyle.json'

export const DARK_MAP_STYLE = darkMapStyle
export const STREETS_MAP_STYLE = streetsMapStyle
export const SATELLITE_STREETS_MAP_STYLE = satelliteStreetsMapStyle
export const BASE_MAP_STYLE_NAME = 'dark'

export const USER_NAME = 'Alex Hofmann'

export const ASSET_TYPE_BY_ID = {
  'l': {
    name: 'Line',
  },
  'b': {
    name: 'Bus',
  },
  't': {
    name: 'Transformer',
  },
  's':{
    name: 'Substation',
  },
  'S':{
    name: 'Station',
  },
}

export const VIEW_STATE = {
  longitude: -93.25845423170956,
  latitude: 37.24365675372345, 
  zoom: 16,
  pitch: 0,
  bearing: 0,
  width: window.innerWidth,
  height: window.innerHeight,
}

export const GEOJSON = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-93.25845423170956, 37.24365675372345],
          [-93.25915738478238, 37.24289151054689],
          [-93.2592196894851, 37.24258682823058],
          [-93.25766207191862, 37.24256557127883],
          [-93.25751076049792, 37.24287025368109],
          [-93.25673640205059, 37.2429056817874],
          [-93.25669189869153, 37.243678010367425],
          [-93.25845423170956, 37.24365675372345],
        ],
      ],
    },
    properties: {
      id: 'aaaa',
    },
  }, {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-93.26257410475657, 37.24696200718064],
    },
    properties: {
      id: 'akM1',
    },
  }, {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-93.26504173705031, 37.24615065347818],
    },
    properties: {
      id: 'anZQ',
    },
  }],
}

export const ASSETS = [{
  id: 'aaaa',
  type: 'S',
  name: 'Power Plant A',
  vendor: 'General Electric',
}, {
  id: 'akM1',
  type: 't',
  name: 'Transformer A',
  vendor: 'Schneider Electric',
  product: 'HVT36A',
  version: '2.0.1',
}, {
  id: 'anZQ',
  type: 'm',
  name: 'Meter A',
  vendor: 'ITRON',
  product: '6219399',
  version: '7.9.5',
}]

export const TASKS = [{
  id: 1,
  name: 'Reset Meter',
  status: 0,
}]

export const RISKS = [{
  id: 1,
  assetId: 'anZQ',
  name: 'Open Port',
  meterCount: 5
}, {
  id: 2,
  assetId: 'akM1',
  name: 'Voltage Too High',
  meterCount: 2
}]

// Specify tooltip delay in milliseconds
export const TOOLTIP_DELAY = 500

export const SKETCHING_MODE_SELECT = 'select'
export const SKETCHING_MODE_ADD = 'add'
export const SKETCHING_MODE_CONNECT = 'connect'
export const SKETCHING_MODE_EDIT = 'edit'
