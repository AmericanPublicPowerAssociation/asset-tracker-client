export function getLetter(index) {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(index)
}

export function getEnding(count) {
  return count === 1 ? '' : 's'
}

export function getCountDescription(count, description) {
  return `${count} ${description}${getEnding(count)}`
}

export function expandCamelCase(text) {
  return text.replace(/([A-Z])/g, ' $1').toLowerCase()
}
