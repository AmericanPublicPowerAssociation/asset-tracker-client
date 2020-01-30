import {
  SET_IS_WITH_ROWS,
  SET_WINDOW_SIZE,
  SET_IS_FULL_SCREEN_DATA_DIALOG,
  LOG_ERROR,
} from '../constants'

export function setIsWithRows() {
  return {
    type: SET_IS_WITH_ROWS
  }
}

export function setWindowSize(newWindow) {
  return {
    type: SET_WINDOW_SIZE,
    payload: newWindow 
  }
} 

export function setIsFullScreenDataDialog() {
  return {
    type: SET_IS_FULL_SCREEN_DATA_DIALOG
  }
}

export function logError(payload) {
  return {
    type: LOG_ERROR,
    payload
  }
}
