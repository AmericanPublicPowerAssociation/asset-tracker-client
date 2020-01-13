import darkMapStyle from './datasets/darkMapStyle.json'
import streetsMapStyle from './datasets/streetsMapStyle.json'
import satelliteStreetsMapStyle from './datasets/satelliteStreetsMapStyle.json'

export const DARK_MAP_STYLE = darkMapStyle
export const STREETS_MAP_STYLE = streetsMapStyle
export const SATELLITE_STREETS_MAP_STYLE = satelliteStreetsMapStyle
export const BASE_MAP_STYLE_NAME = 'dark'

export const USER_NAME = 'Alex Hofmann'

export const ASSET_TYPE_BY_ID = {
  l: {
    name: 'Line',
  },
  b: {
    name: 'Bus',
  },
  t: {
    name: 'Transformer',
  },
  s: {
    name: 'Substation',
  },
  S: {
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
    properties: {
      id: 1,
      type: 's',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-93.26308908888744, 37.24319981451458],
        [-93.26318564841199, 37.24167951084914],
        [-93.26111498305252, 37.24163680524727],
        [-93.261018423528,   37.243216896403936],
        [-93.26308908888744, 37.24319981451458],
      ]],
    }
  }, {
    type: 'Feature',
    properties: {
      id: 2,
      type: 't',
    },
    geometry: {
      type: 'Point',
      coordinates: [-93.26205912062574, 37.24260194594523],
    },
  }, {
    type: 'Feature',
    properties: {
      id: 3,
      type: 't',
    },
    geometry: {
      type: 'Point',
      coordinates: [-93.25442018935136, 37.246342816986676],
    },
  }, {
    type: 'Feature',
    properties: {
      id: 4,
      type: 't',
    },
    geometry: {
      type: 'Point',
      coordinates: [-93.25678494706636, 37.24378659706648],
    },
  }, {
    type: 'Feature',
    properties: {
      id: "632-645",
      type: 'l',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [-93.26205912062574, 37.24278181001797],
        [-93.2608574909871,  37.243473124280854],
        [-93.2608145756428,  37.24542896837055],
        [-93.2564050240223,  37.245480212511424],
      ],
    },
  }, {
    type: 'Feature',
    properties: {
      id: "632-633",
      type: 'l',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [-93.2564050240223,  37.245480212511424],
        [-93.25442018935138, 37.24652268105942],
      ],
    },
  }, {
    type: 'Feature',
    properties: {
      id: "645-646",
      type: 'l',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [-93.25642648169446, 37.24548875319819],
        [-93.25678494706636, 37.24396646113922],
      ],
    },
  }]
}

export const ASSETS = [{
  id: 1,
  type: 's',
  name: 'Substation A',
}, {
  id: 2,
  type: 't',
  name: 'Substation Transformer 1',
  attributes: {
    phaseCount: 3,
    windingCount: 2,
    winding1Winding2PercentReactance: 8 / 1000,
    vendor: 'Schneider Electric',
    product: 'HVT36A',
    version: '2.0.1',
  },
  busByIndex: {
    0: {
      id: 'Ai',
      attributes: {
        connectionType: 'delta',
        baseVoltage: 115,
        baseVoltageUnit: 'kV',
        power: 5000,
        powerUnit: 'kVA',
        powerPercentResistance: 0.5 / 1000,
      },
    },
    1: {
      id: 'Ao',
      attributes: {
        connectionType: 'wye',
        baseVoltage: 4.16,
        baseVoltageUnit: 'kV',
        power: 5000,
        powerUnit: 'kVA',
        powerPercentResistance: 0.5 / 1000,
      },
    },
  },
}, {
  id: 3,
  type: 'm',
  name: 'Industrial Meter 1',
  vendor: 'Schneider Electric',
  product: 'SCH-MV10',
  version: '10.5.7',
  attributes: {
    'phaseCount': 3,
    'loadModel': 1,
  },
  busByIndex: {
    0: {
      id: 'L2o',
      attributes: {
      },
    },
  },
}, {
  id: 4,
  type: 'm',
  name: 'Industrial Meter 2',
  vendor: 'Schneider Electric',
  product: 'SCH-MV10',
  version: '10.5.7',
  attributes: {
    'phaseCount': 3,
    'loadModel': 5,
  },
  busByIndex: {
    0: {
      id: 'L3o',
      attributes: {
      },
    },
  },
}, {
  id: 5,
  type: 'l',
  name: 'Line 1',
  attributes: {
    'phaseCount': 3,
    'lineType': 'mtx601',
    'lineLength': 2000,
    'lengthUnit': 'ft',
  },
  busByIndex: {
    0: {
      id: 'Ao',
      attributes: {
      },
    },
    3: {
      id: 'L1o',
      attributes: {
      },
    },
  },
}, {
  id: 6,
  type: 'l',
  name: 'Line 2',
  attributes: {
    'phaseCount': 3,
    'lineType': 'mtx602',
    'lineLength': 500,
    'lengthUnit': 'ft',
  },
  busByIndex: {
    0: {
      id: 'L1o',
      attributes: {
      },
    },
    1: {
      id: 'L2o',
      attributes: {
      },
    },
  },
}, {
  id: 7,
  type: 'l',
  name: 'Line 3',
  attributes: {
    'phaseCount': 3,
    'lineType': 'mtx602',
    'lineLength': 500,
    'lengthUnit': 'ft',
  },
  busByIndex: {
    0: {
      id: 'L1o',
      attributes: {
      },
    },
    1: {
      id: 'L3o',
      attributes: {
      },
    },
  },
}]

export const TASKS = [{
  id: 1,
  name: 'Reset Meter',
  status: 0,
}]

export const RISKS = [{
  id: 1,
  assetId: 4,
  name: 'Open Port',
  meterCount: 5,
}, {
  id: 2,
  assetId: 5,
  name: 'Voltage Too High',
  meterCount: 2,
}]

// Specify tooltip delay in milliseconds
export const TOOLTIP_DELAY = 500

export const SKETCHING_MODE_SELECT = 'select'
export const SKETCHING_MODE_ADD = 'add'
export const SKETCHING_MODE_CONNECT = 'connect'
export const SKETCHING_MODE_EDIT = 'edit'
