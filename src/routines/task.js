// TODO: Review from scratch

import {
  TASK_PRIORITY_LOW,
  TASK_PRIORITY_NORMAL,
  TASK_PRIORITY_HIGH,
  TASK_STATUS_NEW,
  TASK_STATUS_PENDING,
  TASK_STATUS_DONE,
  TASK_STATUS_CANCELLED,
} from '../constants'

export function getTaskStatusLabel(status) {
  return {
    [TASK_STATUS_NEW]: 'New',
    [TASK_STATUS_PENDING]: 'Pending',
    [TASK_STATUS_DONE]: 'Done',
    [TASK_STATUS_CANCELLED]: 'Cancelled',
  }[status]
}

export function getTaskPriorityLabel(priority) {
  return {
    [TASK_PRIORITY_LOW]: 'Low',
    [TASK_PRIORITY_NORMAL]: 'Normal',
    [TASK_PRIORITY_HIGH]: 'High',
  }[priority]
}
