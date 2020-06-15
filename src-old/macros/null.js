export function isNull(x) {
  return [null, undefined, ''].includes(x)
}

export function isNotNull(x) {
  return !isNull(x)
}
