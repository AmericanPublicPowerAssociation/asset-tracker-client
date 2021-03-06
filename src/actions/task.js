import {
  ADD_TASK,
  ADD_TASK_COMMENT,
  REFRESH_TASKS,
  REFRESH_TASK_COMMENTS,
  SET_SELECTED_TASK_ID,
  SET_TASKS,
  SET_TASK_COMMENTS,
  SET_TASK_COMMENT_COUNT,
  UPDATE_TASK,
} from '../constants'

export function refreshTasks() {
  return { type: REFRESH_TASKS }
}

// TODO: Review all code below
// TODO: Make ids consistently explicit

export function setTasks(assets) {
  return { type: SET_TASKS, payload: assets }
}

export function setTaskName(taskId, name) {
  return { type: UPDATE_TASK, payload: { taskId, name } }
}

export function setTaskComments({ taskId, comments }) {
  return { type: SET_TASK_COMMENTS, payload: { taskId, comments } }
}

export function setTaskCommentCount(id, commentCount) {
  return {
    type: SET_TASK_COMMENT_COUNT,
    payload: { id, commentCount },
  }
}

export function addTask(assetId, name, description, priority) {
  return {
    type: ADD_TASK,
    payload: { assetId, name, description, priority },
  }
}

export function setTaskStatus(taskId, status, priority) {
  return {
    type: UPDATE_TASK,
    payload: { taskId, status, priority },
  }
}

export function setTaskPriority(taskId, priority, status) {
  return {
    type: UPDATE_TASK,
    payload: { taskId, priority, status },
  }
}

export function refreshTaskComments(taskId) {
  return { type: REFRESH_TASK_COMMENTS, payload: { taskId } }
}

export function addAssetTaskComment(taskId, text) {
  return { type: ADD_TASK_COMMENT, payload: { taskId, text } }
}

export function setSelectedTaskId(taskId) {
  return { type: SET_SELECTED_TASK_ID, payload: { taskId } }
}

// TODO: Review all code above
