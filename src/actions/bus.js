import {
  SET_FOCUSING_BUS_ID,
  SET_SELECTED_BUS_INDEXES,
} from '../constants'

export function setFocusingBusId(id) {
  return {type: SET_FOCUSING_BUS_ID, payload: id}
}


export function setSelectedBusIndexes(busIndexes) {
  return {type: SET_SELECTED_BUS_INDEXES, payload: busIndexes}
}
