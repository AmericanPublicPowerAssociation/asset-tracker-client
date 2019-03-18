import { fromJS } from 'immutable'
import ASSETS_JSON from '../datasets/assets.json'
import mapStyle from '../datasets/map-style-satellite-streets.json'

const assets = [{
  id: 'station1',
  name: 'Station 1',
  vendorName: 'ge',
  productName: 'mds_pulsenet',
  productVersion: '3.1.3',
  typeId: 'S',
  childIds: [
    'generator1',
    'storage1',
    'switch1',
    'control1',
    'busbar1',
    'transformer1',
  ],
}, {
  id: 'generator1',
  name: 'Generator 1',
  vendorName: 'ge',
  productName: 'multilink_firmware',
  productVersion: '5.4.1',
  typeId: 'g',
  connectedIds: [
    'storage1',
    'busbar1',
  ],
  parentIds: [
    'station1',
  ],
}, {
  id: 'storage1',
  name: 'Storage 1',
  vendorName: 'schneider-electric',
  productName: 'powerlogic_pm8ecc_firmware',
  productVersion: '2.651',
  typeId: 'o',
  connectedIds: [
    'generator1',
    'switch1',
  ],
  parentIds: [
    'station1',
  ],
}, {
  id: 'switch1',
  name: 'Switch 1',
  vendorName: 'schneider-electric',
  productName: 'somove',
  productVersion: '1.7',
  typeId: 'x',
  connectedIds: [
    'storage1',
    'busbar1',
    'control1',
  ],
  parentIds: [
    'station1',
  ],
}, {
  id: 'control1',
  name: 'Control 1',
  vendorName: 'schneider-electric',
  productName: 'somachine_basic',
  productVersion: '1.6',
  typeId: 'c',
  connectedIds: [
    'switch1',
  ],
  parentIds: [
    'station1',
  ],
}, {
  id: 'busbar1',
  name: 'Busbar 1',
  vendorName: 'schneider-electric',
  productName: 'foxview',
  productVersion: '10.5',
  typeId: 'b',
  connectedIds: [
    'generator1',
    'switch1',
    'transformer1',
  ],
  parentIds: [
    'station1',
  ],
}, {
  id: 'transformer1',
  name: 'Transformer 1',
  vendorName: 'siemens',
  productName: 'sicam_pas',
  productVersion: '8.06',
  typeId: 't',
  connectedIds: [
    'busbar1',
    'line1',
  ],
  parentIds: [
    'station1',
  ],
}, {
  id: 'line1',
  name: 'Line 1',
  vendorName: 'siemens',
  productName: 'scalance_m-800_firmware',
  productVersion: '4.01',
  typeId: 'l',
  connectedIds: [
    'transformer1',
    'transformer2',
  ],
  childIds: [
    'pole1a',
    'pole1b',
  ],
}, {
  id: 'pole1a',
  name: 'Pole 1A',
  vendorName: 'siemens',
  productName: 'simatic_pcs_7',
  productVersion: '8.0',
  typeId: 'p',
  parentIds: [
    'line1',
  ],
}, {
  id: 'pole1b',
  name: 'Pole 1B',
  vendorName: 'siemens',
  productName: 'ruggedcom_rugged_operating_system',
  productVersion: '3.2.5',
  typeId: 'p',
  parentIds: [
    'line1',
  ],
}, {
  id: 'substation1',
  name: 'Substation 1',
  vendorName: 'ge',
  productName: 'xeleris',
  productVersion: '1.0',
  typeId: 's',
  childIds: [
    'transformer2',
    'busbar2',
    'switch2a',
    'switch2b',
    'control2',
  ],
}, {
  id: 'transformer2',
  name: 'Transformer 2',
  vendorName: 'gnu',
  productName: 'libc',
  productVersion: '1.0',
  typeId: 't',
  connectedIds: [
    'line1',
    'busbar2',
  ],
  parentIds: [
    'substation1',
  ],
}, {
  id: 'busbar2',
  name: 'Busbar 2',
  vendorName: 'nfs',
  productName: 'nfs-utils',
  productVersion: '1.0',
  typeId: 'b',
  connectedIds: [
    'transformer2',
    'switch2a',
    'switch2b',
  ],
  parentIds: [
    'substation1',
  ],
}, {
  id: 'switch2a',
  name: 'Switch 2A',
  vendorName: 'citrix',
  productName: 'metaframe',
  productVersion: '1.0',
  typeId: 'x',
  connectedIds: [
    'busbar2',
    'line2a',
  ],
  parentIds: [
    'substation1',
  ],
}, {
  id: 'switch2b',
  name: 'Switch 2B',
  vendorName: 'cisco',
  productName: 'ciscoworks_common_management_foundation',
  productVersion: '2.0',
  typeId: 'x',
  connectedIds: [
    'busbar2',
    'line2b',
  ],
  parentIds: [
    'substation1',
  ],
}, {
  id: 'control2',
  name: 'Control 2',
  vendorName: 'libexpat',
  productName: 'expat',
  productVersion: '1.0',
  typeId: 'c',
  connectedIds: [
    'switch2a',
    'switch2b',
  ],
  parentIds: [
    'substation1',
  ],
}, {
  id: 'line2a',
  name: 'Line 2A',
  vendorName: 'apache',
  productName: 'struts',
  productVersion: '1.0',
  typeId: 'l',
  connectedIds: [
    'switch2a',
    'quality2a',
  ],
  childIds: [
    'pole2a1',
    'pole2a2',
  ],
}, {
  id: 'line2b',
  name: 'Line 2B',
  vendorName: 'samsung',
  productName: 'knox',
  productVersion: '1.0',
  typeId: 'l',
  connectedIds: [
    'switch2b',
    'quality2b',
  ],
  childIds: [
    'pole2b1',
    'pole2b2',
  ],
}, {
  id: 'quality2a',
  name: 'Quality 2A',
  vendorName: 'ffmpeg',
  productName: 'ffmpeg',
  productVersion: '1.0',
  typeId: 'q',
  connectedIds: [
    'line2a',
    'transformer2a',
  ],
  parentIds: [
    'pole2a2',
  ],
}, {
  id: 'quality2b',
  name: 'Quality 2B',
  vendorName: 'linecorp',
  productName: 'line',
  productVersion: '4.7.0',
  typeId: 'q',
  connectedIds: [
    'line2b',
    'transformer2b',
  ],
  parentIds: [
    'pole2b2',
  ],
}, {
  id: 'pole2a1',
  name: 'Pole 2A1',
  vendorName: 'ipswitch',
  productName: 'ws_ftp_server',
  productVersion: '3.4',
  typeId: 'p',
  parentIds: [
    'line2a',
  ],
}, {
  id: 'pole2a2',
  name: 'Pole 2A2',
  vendorName: 'selinc',
  productName: 'sel_compass',
  productVersion: '3.0.5.1',
  typeId: 'p',
  parentIds: [
    'line2a',
  ],
}, {
  id: 'pole2b1',
  name: 'Pole 2B1',
  vendorName: 'selinc',
  productName: 'sel-2241',
  productVersion: 'r113-v0-z001001-d20110721',
  typeId: 'p',
  parentIds: [
    'line2b',
  ],
}, {
  id: 'pole2b2',
  name: 'Pole 2B2',
  vendorName: 'selinc',
  productName: 'acselerator_architect',
  productVersion: '2.2.24.0',
  typeId: 'p',
  parentIds: [
    'line2b',
  ],
}, {
  id: 'transformer2a',
  name: 'Transformer 2A',
  vendorName: 'aveva',
  productName: 'clearscada',
  productVersion: '2010',
  typeId: 't',
  connectedIds: [
    'quality2a',
    'meter2a',
  ],
  parentIds: ['pole2a2'],
}, {
  id: 'transformer2b',
  name: 'Transformer 2B',
  vendorName: 'qeiinc',
  productName: 'epaq-9410_substation_gateway',
  productVersion: '1.0',
  typeId: 't',
  connectedIds: [
    'quality2b',
    'meter2b',
  ],
  parentIds: [
    'pole2b2',
  ],
}, {
  id: 'meter2a',
  name: 'Meter 2A',
  vendorName: 'sendmail',
  productName: 'sendmail',
  productVersion: '5.4',
  typeId: 'm',
  connectedIds: [
    'transformer2a',
  ],
}, {
  id: 'meter2b',
  name: 'Meter 2B',
  vendorName: 'openbsd',
  productName: 'openssh',
  productVersion: '1.2',
  typeId: 'm',
  connectedIds: [
    'transformer2b',
  ],
}]
// const assets = ASSETS_JSON

export const CONTENT_PADDING = 24

export const INFORMATION_DRAWER_WIDTH = 512
export const FILTER_LIST_DRAWER_WIDTH = 256

export const ADD_ASSET = 'ADD_ASSET'
export const UPDATE_ASSET = 'UPDATE_ASSET'

export const UPDATE_ASSET_LOCATION = 'UPDATE_ASSET_LOCATION'
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
  },
  S: {
    name: 'Station',
    connectedIds: [],
    parentIds: [],
    childIds: ['p', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    locatable: true,
  },
  X: {
    name: 'Other',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    locatable: true,
  },
}
export const SELECTED_ASSET_TYPE_IDS = fromJS(['l'])
export const DEFAULT_ASSET_TYPE_ID = 'p'

export const ASSET_BY_ID = fromJS(
  assets.reduce((o, x) => Object.assign(o, {[x.id]: x}), {}))
export const SORTED_ASSET_IDS = ASSET_BY_ID.keySeq().toList()
export const MAXIMUM_LIST_LENGTH = 50

export const ASSET_LOCATION_BY_ID = fromJS({})
export const FEATURE_GEOMETRY_BY_ID = fromJS({})
export const FEATURE_COLOR_ATTRIBUTE = 'typeId'
export const FEATURE_SIZE_ATTRIBUTE = 'kV'
export const MAP_STYLE = fromJS(mapStyle)
export const KEY_PREFIX = 'asset-tracker-'
export const PROPERTY_MINIMUM_VALUE = 1
export const PROPERTY_MAXIMUM_VALUE = 9

export const CIRCUIT_DEPTH = 3
export const DEBOUNCE_THRESHOLD_IN_MILLISECONDS = 100
export const CYTOSCAPE_LAYOUT = {'name': 'cose'}

export const TOOLTIP_DELAY = 500
