import {
  UPDATE_TASK,
} from '../constants'

export function setTaskName(task_id, name, priority, status) {
  return {
    type: UPDATE_TASK,
    payload: {task_id, name, priority, status}}
}
