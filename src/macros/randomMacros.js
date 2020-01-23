const ALPHABET = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'0123456789',
]
const ALPHABET_LENGTH = ALPHABET.length

export function getRandomString(length) {
  // https://gist.github.com/6174/6062387#gistcomment-2993079
  return [...Array(length)]
    .map(_ => ALPHABET[Math.random() * ALPHABET_LENGTH | 0])
    .join('')
}
