// TODO: Review from scratch

import {
  HIDE_MESSAGE,
  SHOW_MESSAGE,
} from '../constants'

export function showInfoMessage(text) {
  return showMessage(text, 'info')
}

export function showSuccessMessage(text) {
  return showMessage(text, 'success')
}

export function showWarningMessage(text) {
  return showMessage(text, 'warning')
}

export function showErrorMessage(text) {
  return showMessage(text, 'error')
}

export function showMessage(text, severity) {
  return { type: SHOW_MESSAGE, payload: { text, severity } }
}

export function hideMessage() {
  return { type: HIDE_MESSAGE }
}
