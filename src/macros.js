export class IntegerDefaultDict {
  constructor() {
    return new Proxy({}, {
      get: (d, k) => k in d ? d[k] : 0
    })
  }
}


export function getById(items, d) {
  return items.reduce((
    itemById, item,
  ) => itemById.set(
    item.get('id'),
    item,
  ), d)
}


export function getIds(items) {
  return items.map(item => item.get('id'))
}


export function splitTerms(text) {
  const rawTerms = compactWhitespace(text.trim()).match(/\w+|"[^"]+"/g)
  if (!rawTerms) {
    return []
  }
  return rawTerms.map(term => term.replace(/"/g, ''))
}


export function compactWhitespace(text) {
  return text.replace(/\s\s+/g, ' ')
}


export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
