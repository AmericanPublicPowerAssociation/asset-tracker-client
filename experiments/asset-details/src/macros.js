export function getById(items, d) {
  return items.reduce((itemById, item) => {
    itemById[item['id']] = item
    return itemById
  }, d)
}
