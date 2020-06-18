import {
  REFRESH_TASKS,
} from '../constants'

export function refreshTasks() {
  return { type: REFRESH_TASKS }
}
