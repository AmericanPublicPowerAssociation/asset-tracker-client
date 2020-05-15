import {
  LOG_ERROR,
} from '../constants'

export function logError() {
  return { type: LOG_ERROR }
}
