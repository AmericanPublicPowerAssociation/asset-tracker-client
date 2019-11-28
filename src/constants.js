export const GEOJSON = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-73.89756698413085, 40.782009430441526]
    },
    "properties": {
      "id": "akM1",
      "type": "tp"
    }
  }, {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-73.89679450793457, 40.78119703780428]
    },
    "properties": {
      "id": "anZQ",
      "type": "m"
    }
  }]
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
