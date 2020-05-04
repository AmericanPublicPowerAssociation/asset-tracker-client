import {
  UPDATE_TASK,
  SET_TASK_COMMENT_COUNT,
} from '../constants'

export function setTaskName(task_id, name, priority, status) {
  return {
    type: UPDATE_TASK,
    payload: {task_id, name, priority, status}}
}

export function setTaskCommentCount(id, commentCount) {
  return {
    type: SET_TASK_COMMENT_COUNT,
    payload: {id, commentCount}
  }
}
