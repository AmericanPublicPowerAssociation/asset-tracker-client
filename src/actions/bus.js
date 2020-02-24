import {
  SET_FOCUSING_BUS_ID,
} from '../constants'

export function setFocusingBusId(id) {
  return {type: SET_FOCUSING_BUS_ID, payload: id}
}
