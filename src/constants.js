export const USER_NAME = 'Alex Hofmann'

export const VIEW_STATE = {
  longitude: -93.25845423170956,
  latitude: 37.24365675372345, 
  zoom: 16,
  pitch: 0,
  bearing: 0,
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
    properties: {},
  }],
}

export const ASSETS = [{
  "id": "akM1",
  "type": "tp",
  "name": "High Voltage Transformer 1",
  "vendor": "Schneider Electric",
  "product": "HVT36A",
  "version": "2.0.1"
}, {
  "id": "anZQ",
  "type": "m",
  "name": "Meter 1",
  "vendor": "ITRON",
  "product": "6219399",
  "version": "7.9.5"
}]

export const TASKS = [{
  "id": 1,
  "name": "Clean Transformer",
  "status": 50
}, {
  "id": 2,
  "name": "Reset Meter",
  "status": 0
}]

export const RISKS = [{
  "id": 1,
  "assetId": "anZQ",
  "name": "Open Port",
  "meterCount": 5
}, {
  "id": 2,
  "assetId": "akM1",
  "name": "Voltage Too High",
  "meterCount": 2
}]

// Specify tooltip delay in milliseconds
export const TOOLTIP_DELAY = 500
