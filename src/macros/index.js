import { Map, OrderedSet } from 'immutable'


export class IntegerDefaultDict {
  constructor() {
    return new Proxy({}, {
      get: (d, k) => k in d ? d[k] : 0
    })
  }
}


export const getById = items => items.reduce((
  itemById, item) => itemById.set(item.get('id'), item), Map())


export const getOrderedIds = items => OrderedSet(items.map(
  item => item.get('id')))


export const splitTerms = text => compactWhitespace(text).trim().split(' ')


export const compactWhitespace = text => text.replace(/\s\s+/g, ' ')
