import { ADD_ASSET } from '../constants'

const FORBIDDEN_WORDS = ["money", "spam"]

export function forbiddenWordsTween({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_ASSET) {
        const foundWord = FORBIDDEN_WORDS.filter(
          word => action.payload.title.includes(word)
        )
        if (foundWord.length) {
          return dispatch({ type: 'FOUND_BAD_WORD' })
        }
      }
      return next(action)
    }
  }
}
