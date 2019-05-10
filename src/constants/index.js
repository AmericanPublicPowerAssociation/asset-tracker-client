export const CONTENT_PADDING = 24
export const NAVIGATION_DRAWER_WIDTH = 192
export const INFORMATION_DRAWER_WIDTH = 512
export const RIGHT_DRAWER_MINIMUM_WIDTH = 256


export const MAXIMUM_ASSET_LIST_LENGTH = 100


export const REPLACE_ASSETS = 'REPLACE_ASSETS'


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
