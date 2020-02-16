export function getByKey(items, key) {
  return items.reduce((itemById, item) => {
    itemById[item[key]] = item
    return itemById
  }, {})
}
