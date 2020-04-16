import tasks from '../datasets/tasks/example1.json'

export const TASK_ARCHIVE_STATUS = 100

export const TASK_STATUS_CANCELLED = -1
export const TASK_STATUS_NEW = 0
export const TASK_STATUS_PENDING = 10
export const TASK_STATUS_DONE = 100

export const TASK_PRIORITY_LOW = 1
export const TASK_PRIORITY_NORMAL = 10
export const TASK_PRIORITY_HIGH = 100

export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const SET_TASK_STATUS = 'SET_STATUS_UPDATE'
export const SET_TASK_PRIORITY = 'SET_STATUS_PRIORITY'
export const SET_TASK_COMMENT_COUNT = 'SET_TASK_COMMENT_COUNT'
export const TASKS = tasks
export const REFRESH_ASSET_COMMENTS = 'REFRESH_ASSET_COMMENTS'
export const ADD_TASK_COMMENT = 'ADD_ASSET_COMMENT'
export const SET_TASK_NAME = 'SET_TASK_NAME'
