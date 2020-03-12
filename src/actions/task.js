import {
  SET_TASK_NAME,
} from '../constants'

export function setTaskName(id, name) {
  return {type: SET_TASK_NAME, payload: {id, name}}
}
