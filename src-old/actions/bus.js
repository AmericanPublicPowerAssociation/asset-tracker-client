import {
  SET_SELECTED_BUS_ID,
} from '../constants'

export function setSelectedBusId(busId) {
  return { type: SET_SELECTED_BUS_ID, payload: busId }
}
