import {
  SET_SELECTED_BUS_ID,
} from '../constants'

export function setSelectedBusId(id) {
  return {
    type: SET_SELECTED_BUS_ID,
    payload: id,
  }
}
