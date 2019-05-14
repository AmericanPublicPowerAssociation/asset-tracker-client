export const CONTENT_PADDING = 24
export const NAVIGATION_DRAWER_WIDTH = 192
export const INFORMATION_DRAWER_WIDTH = 512
export const RIGHT_DRAWER_MINIMUM_WIDTH = 256


export const MAXIMUM_ASSET_LIST_LENGTH = 100
export const TOOLTIP_DELAY = 500


export const REPLACE_ASSETS = 'REPLACE_ASSETS'
export const MERGE_ASSETS = 'MERGE_ASSETS'


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
    typeById: {
      r: {name: 'Residential'},
      c: {name: 'Commercial'},
      i: {name: 'Industrial'},
      X: {name: 'Other'},
    },
    locatable: true,
  },
  t: {
    name: 'Transformer',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p'],
    childIds: [],
    typeById: {
      d: {name: 'Distribution'},
      p: {name: 'Power'},
      X: {name: 'Other'},
    },
  },
  x: {
    name: 'Switch',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    typeById: {
      f: {name: 'Fuse'},
      b: {name: 'Breaker'},
      c: {name: 'Recloser'},
      i: {name: 'Interrupter'},
      s: {name: 'Sectionalizer'},
      r: {name: 'Relay'},
      X: {name: 'Other'},
    },
  },
  q: {
    name: 'Power Quality',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    typeById: {
      c: {name: 'Capacitor'},
      r: {name: 'Regulator'},
      b: {name: 'Booster'},
      X: {name: 'Other'},
    },
  },
  c: {
    name: 'Control',
    connectedIds: ['l', 'm', 't', 'x', 'q', 'c', 'b', 'o', 'g', 'X'],
    parentIds: ['p', 's', 'S'],
    childIds: [],
    typeById: {
      p: {name: 'PLC'},
      m: {name: 'Microcontroller'},
      X: {name: 'Other'},
    },
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
    typeById: {
      d: {name: 'Distribution'},
      t: {name: 'Transmission'},
      X: {name: 'Other'},
    },
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
export const DEFAULT_ASSET_TYPE_ID = 'p'
