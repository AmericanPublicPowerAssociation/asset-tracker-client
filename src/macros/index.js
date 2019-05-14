import { OrderedSet, fromJS } from 'immutable'


export const getById = items => fromJS(items.reduce((
  itemById, item
) => Object.assign(itemById, {[item.id]: item}), {}))


export const getOrderedIds = items => OrderedSet(items.map(item => item.id))
