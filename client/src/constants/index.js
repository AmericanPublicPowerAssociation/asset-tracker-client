export const CONTENT_PADDING = 24

export const INFORMATION_DRAWER_WIDTH = 512
export const FILTER_LIST_DRAWER_WIDTH = 256

export const ADD_ASSET = 'ADD_ASSET'
export const UPDATE_ASSET = 'UPDATE_ASSET'

export const ADD_SELECTED_ASSET_TYPE = 'ADD_SELECTED_ASSET_TYPE'
export const TOGGLE_SELECTED_ASSET_TYPE = 'TOGGLE_SELECTED_ASSET_TYPE'

export const SET_HIGHLIGHTED_ASSET = 'SET_HIGHLIGHTED_ASSET'
export const SET_EXPOSED_ASSET = 'SET_EXPOSED_ASSET'

export const REMOVE_ASSET_RELATION = 'REMOVE_ASSET_RELATION'
export const TOGGLE_ASSET_RELATION = 'TOGGLE_ASSET_RELATION'

export const ASSET_TYPE_BY_ID = {
  'p': {
    name: 'Pole',
    connectedIds: [],
    parentIds: ['l', 's', 'S'],
    childIds: ['m', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
  },
  'l': {
    name: 'Line',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: [],
    childIds: ['p'],
  },
  'm': {
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
  },
  't': {
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
  'x': {
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
  'q': {
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
  'c': {
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
  'b': {
    name: 'Busbar',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
  },
  'o': {
    name: 'Storage',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
  },
  'g': {
    name: 'Generator',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
  },
  's': {
    name: 'Substation',
    connectedIds: [],
    parentIds: [],
    childIds: ['p', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    subTypes: [
      {id: 'sd', name: 'Distribution'},
      {id: 'st', name: 'Transmission'},
      {id: 'sX', name: 'Other'},
    ],
  },
  'S': {
    name: 'Station',
    connectedIds: [],
    parentIds: [],
    childIds: ['p', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
  },
  'X': {
    name: 'Other',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
  },
}
export const SELECTED_ASSET_TYPE_IDS = ['l']
export const DEFAULT_ASSET_TYPE_ID = 'p'

export const ASSET_BY_ID = {
  station1: {
    name: 'Station 1',
    typeId: 'S',
    childIds: [
      'generator1',
      'storage1',
      'switch1',
      'control1',
      'busbar1',
      'transformer1']},
  generator1: {
    name: 'Generator 1',
    typeId: 'g',
    connectedIds: ['storage1', 'busbar1'],
    parentIds: ['station1']},
  storage1: {
    name: 'Storage 1',
    typeId: 'o',
    connectedIds: ['generator1', 'switch1'],
    parentIds: ['station1']},
  switch1: {
    name: 'Switch 1',
    typeId: 'x',
    connectedIds: ['storage1', 'busbar1', 'control1'],
    parentIds: ['station1']},
  control1: {
    name: 'Control 1',
    typeId: 'c',
    connectedIds: ['switch1'],
    parentIds: ['station1']},
  busbar1: {
    name: 'Busbar 1',
    typeId: 'b',
    connectedIds: ['generator1', 'switch1', 'transformer1'],
    parentIds: ['station1']},
  transformer1: {
    name: 'Transformer 1',
    typeId: 't',
    connectedIds: ['busbar1', 'line1'],
    parentIds: ['station1']},
  line1: {
    name: 'Line 1',
    typeId: 'l',
    connectedIds: ['transformer1', 'transformer2'],
    childIds: ['pole1a', 'pole1b']},
  pole1a: {
    name: 'Pole 1A',
    typeId: 'p',
    parentIds: ['line1']},
  pole1b: {
    name: 'Pole 1B',
    typeId: 'p',
    parentIds: ['line1']},
  substation1: {
    name: 'Substation 1',
    typeId: 's',
    childIds: [
      'transformer2',
      'busbar2',
      'switch2a',
      'switch2b',
      'control2',
    ]},
  transformer2: {
    name: 'Transformer 2',
    typeId: 't',
    connectedIds: ['line1', 'busbar2'],
    parentIds: ['substation1']},
  busbar2: {
    name: 'Busbar 2',
    typeId: 'b',
    connectedIds: ['transformer2', 'switch2a', 'switch2b'],
    parentIds: ['substation1']},
  switch2a: {
    name: 'Switch 2A',
    typeId: 'x',
    connectedIds: ['busbar2', 'line2a'],
    parentIds: ['substation1']},
  switch2b: {
    name: 'Switch 2B',
    typeId: 'x',
    connectedIds: ['busbar2', 'line2b'],
    parentIds: ['substation1']},
  control2: {
    name: 'Control 2',
    typeId: 'c',
    connectedIds: ['switch2a', 'switch2b'],
    parentIds: ['substation1']},
  line2a: {
    name: 'Line 2A',
    typeId: 'l',
    connectedIds: ['switch2a', 'quality2a'],
    childIds: ['pole2a1', 'pole2a2']},
  line2b: {
    name: 'Line 2B',
    typeId: 'l',
    connectedIds: ['switch2b', 'quality2b'],
    childIds: ['pole2b1', 'pole2b2']},
  quality2a: {
    name: 'Quality 2A',
    typeId: 'q',
    connectedIds: ['line2a', 'transformer2a'],
    parentIds: ['pole2a2']},
  quality2b: {
    name: 'Quality 2B',
    typeId: 'q',
    connectedIds: ['line2b', 'transformer2b'],
    parentIds: ['pole2b2']},
  pole2a1: {
    name: 'Pole 2A1',
    typeId: 'p',
    parentIds: ['line2a']},
  pole2a2: {
    name: 'Pole 2A2',
    typeId: 'p',
    parentIds: ['line2a']},
  pole2b1: {
    name: 'Pole 2B1',
    typeId: 'p',
    parentIds: ['line2b']},
  pole2b2: {
    name: 'Pole 2B2',
    typeId: 'p',
    parentIds: ['line2b']},
  transformer2a: {
    name: 'Transformer 2A',
    typeId: 't',
    connectedIds: ['quality2a', 'meter2a'],
    parentIds: ['pole2a2']},
  transformer2b: {
    name: 'Transformer 2B',
    typeId: 't',
    connectedIds: ['quality2b', 'meter2b'],
    parentIds: ['pole2b2']},
  meter2a: {
    name: 'Meter 2A',
    typeId: 'm',
    connectedIds: ['transformer2a']},
  meter2b: {
    name: 'Meter 2B',
    typeId: 'm',
    connectedIds: ['transformer2b']},
}
export const SORTED_ASSET_IDS = Object.keys(ASSET_BY_ID)

export const RELATION_NAME_BY_KEY = {
  connectedIds: 'Connections',
  parentIds: 'Parents',
  childIds: 'Children',
}
