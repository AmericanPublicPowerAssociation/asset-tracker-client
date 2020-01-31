import produce from 'immer'
import {
  IS_WITH_ROWS,
  IS_FULL_SCREEN_DATA_DIALOG,
  SET_IS_FULL_SCREEN_DATA_DIALOG,
  SET_IS_WITH_ROWS,
  SET_WINDOW_SIZE,
  SET_OVERLAY,
} from '../constants'

const initialState = {
  isWithRows: IS_WITH_ROWS,
  windowSize: {
    innerWidth: 0,
    innerHeight: 0,
  },
  isFullScreenDataDialog: IS_FULL_SCREEN_DATA_DIALOG,
  overlay: 'assets',
}

const app = produce((draft, action) => {
  switch(action.type) {
    case SET_IS_WITH_ROWS: {
      draft.isWithRows = !draft.isWithRows
      break
    }
    case SET_IS_FULL_SCREEN_DATA_DIALOG: {
      draft.isFullScreenDataDialog = !draft.isFullScreenDataDialog
      break
    }
    case SET_WINDOW_SIZE: {
      draft.windowSize = action.payload
      break
    }
    case SET_OVERLAY: {
      draft.overlay = action.payload
      break
    }
    default: {}
  }
}, initialState)

export default app
