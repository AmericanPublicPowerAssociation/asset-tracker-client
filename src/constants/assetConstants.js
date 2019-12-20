import {
  getById,
} from '../macros'

export const LINE_ASSET_TYPE_ID = 'l'
export const TRANSFORMER_ASSET_TYPE_ID = 't'
export const SUBSTATION_ASSET_TYPE_ID = 's'
export const STATION_ASSET_TYPE_ID = 'S'

export const ASSET_TYPE_BY_ID = {
  [LINE_ASSET_TYPE_ID]: {
    name: 'Line',
  },
  [TRANSFORMER_ASSET_TYPE_ID]: {
    name: 'Transformer',
  },
  [SUBSTATION_ASSET_TYPE_ID]: {
    name: 'Substation',
  },
  [STATION_ASSET_TYPE_ID]: {
    name: 'Station',
  },
}

export const ASSETS_GEOJSON = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      id: 1,
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
    },
    geometry: {
      type: 'Point',
      coordinates: [-93.26205912062574, 37.24260194594523],
    },
  }, {
    type: 'Feature',
    properties: {
      id: 3,
    },
    geometry: {
      type: 'Point',
      coordinates: [-93.25442018935136, 37.246342816986676],
    },
  }, {
    type: 'Feature',
    properties: {
      id: 4,
    },
    geometry: {
      type: 'Point',
      coordinates: [-93.25678494706636, 37.24378659706648],
    },
  }, {
    type: 'Feature',
    properties: {
      id: 5,
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
      id: 6,
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
      id: 7,
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [-93.2564050240223,  37.245480212511424],
        [-93.25678494706636, 37.24396646113922],
      ],
    },
  }]
}

export const ASSETS = [{
  id: 1,
  typeId: 's',
  name: 'Substation A',
}, {
  id: 2,
  typeId: 't',
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
  typeId: 'm',
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
  typeId: 'm',
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
  typeId: 'l',
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
    1: {
      id: 'L1o',
      attributes: {
      },
    },
  },
}, {
  id: 6,
  typeId: 'l',
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
  typeId: 'l',
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

export const ASSET_BY_ID = getById(ASSETS, {})
