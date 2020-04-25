import {
  REFRESH_TASKS,
  SET_TASKS,
  SET_TASK_COMMENTS,
  SET_TASK_COMMENT_COUNT,
  SET_TASK_NAME,
} from '../constants'

export function refreshTasks() {
  return {
    type: REFRESH_TASKS,
  }
}

export function setTasks(assets) {
  return {
    type: SET_TASKS,
    payload: assets,
  }
}

export function setTaskName(id, name) {
  return { type: SET_TASK_NAME, payload: { id, name } }
}

export function setTaskComments({ task_id, comments }) {
  return {
    type: SET_TASK_COMMENTS,
    payload: { task_id, comments },
  }
}

export function setTaskCommentCount(id, commentCount) {
  return {
    type: SET_TASK_COMMENT_COUNT,
    payload: { id, commentCount },
  }
}
