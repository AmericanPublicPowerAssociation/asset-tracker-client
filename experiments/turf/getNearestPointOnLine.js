const f = require('@turf/nearest-point-on-line').default

const l = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [[0, 0], [1, 0], [2, 0]],
  },
}
const p = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [1.9, 0.1],
  },
}
// const result = f(l, p, { units: 'meters' })
const result = f(l, p)
console.log(JSON.stringify(l))
console.log(JSON.stringify(p))
console.log(result)
