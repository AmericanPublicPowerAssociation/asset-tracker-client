

// TODO: Review from scratch

export function getByKey(items, key) {
  // TODO: Consider replacing with for loop because it is faster
  return items.reduce((itemById, item) => {
    itemById[item[key]] = item
    return itemById
  }, {})
}
