import { Map } from 'immutable'


export class IntegerDefaultDict {
  constructor() {
    return new Proxy({}, {
      get: (d, k) => k in d ? d[k] : 0
    })
  }
}


export const getById = items => items.reduce((
  itemById, item) => itemById.set(item.get('id'), item), Map())


export const getIds = items => items.map(
  item => item.get('id'))


export const splitTerms = text => {
  const rawTerms = compactWhitespace(text.trim()).match(/\w+|"[^"]+"/g)
  if (!rawTerms) {
    return []
  }
  return rawTerms.map(term => term.replace(/"/g, ''))
}


export const compactWhitespace = text => text.replace(/\s\s+/g, ' ')
