import { OrderedSet, fromJS } from 'immutable'


export class IntegerDefaultDict {
  constructor() {
    return new Proxy({}, {
      get: (d, k) => k in d ? d[k] : 0
    })
  }
}


export const getById = items => fromJS(items.reduce((
  itemById, item
) => Object.assign(itemById, {[item.id]: item}), {}))


export const getOrderedIds = items => OrderedSet(items.map(item => item.id))


export const splitTerms = text => compactWhitespace(text).trim().split(' ')


export const compactWhitespace = text => text.replace(/\s\s+/g, ' ')
