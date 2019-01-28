const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const ALPHABET = UPPERCASE_LETTERS + LOWERCASE_LETTERS + DIGITS

export const getRandomString = length => {
  let x = ''
  for (let i = 0; i < length; i++) {
    x += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  }
  return x
}
