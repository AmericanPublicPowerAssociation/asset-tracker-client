import produce from 'immer'
import {
  IS_WITH_ROWS,
  SET_IS_WITH_ROWS,
} from '../constants'

const initialState = {
  isWithRows: IS_WITH_ROWS,
}

const rowsWindow = produce((draft, action) => {
  switch(action.type) {
    case SET_IS_WITH_ROWS: {
      draft.isWithRows = !draft.isWithRows
      break
    }
    default: {}
  }
}, initialState)

export default rowsWindow
