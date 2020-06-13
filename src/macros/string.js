export function getTitleCaseFromCamelCase(text) {
  return capitalize(expandCamelCase(text))
}

export function getLowerCaseFromCamelCase(text) {
  return expandCamelCase(text).toLowerCase()
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function expandCamelCase(text) {
  return text.replace(/([A-Z])/g, ' $1')
}

export function getCountDescription(count, description) {
  return `${count} ${description}${getEnding(count)}`
}

export function getEnding(count) {
  return count === 1 ? '' : 's'
}
