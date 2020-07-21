// TODO: Review from scratch

import produce from 'immer'
import {
  HIDE_MESSAGE,
  SHOW_MESSAGE,
} from '../constants'

const initialState = {}

const message = produce((draft, action) => {
  switch (action.type) {
    case SHOW_MESSAGE: {
      const { text, severity } = action.payload
      draft.text = text
      draft.severity = severity
      draft.isOpen = true
      break
    }
    case HIDE_MESSAGE: {
      draft.isOpen = false
      break
    }
    default: { }
  }
}, initialState)

export default message
