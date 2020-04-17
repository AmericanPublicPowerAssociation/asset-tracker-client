import {
  SET_TASK_COMMENT_COUNT,
  SET_TASK_NAME,
} from '../constants'

export function setTaskName(id, name) {
  return {type: SET_TASK_NAME, payload: {id, name}}
}

export function setTaskCommentCount(id, commentCount) {
  return {
    type: SET_TASK_COMMENT_COUNT,
    payload: {id, commentCount}
  }
}
