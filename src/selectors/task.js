// TODO: Move to asset-report-tasks
import { createSelector } from 'reselect'
import {
  getFocusingAssetId,
} from './asset'
import {
  TASK_STATUS_DONE,
  TASK_STATUS_CANCELLED,
} from '../constants'

export const getTaskById = state => state.taskById
export const getTaskCodeTypes = state => state.taskCodeTypes
export const getTaskComments = state => state.taskComments.comments || []
export const getSelectedTaskId = state => state.selectedTaskId

export const getOpenTaskById = createSelector([
  getTaskById,
], (
  taskById,
) => {
  return Object.values(taskById)
    .filter( task => {
      return (
        task.status !== TASK_STATUS_DONE &&
        task.status !== TASK_STATUS_CANCELLED
      )
    })
})

export const getOpenTaskCount = createSelector([
  getOpenTaskById,
], (
  openTaskById,
) => {
  return openTaskById.length
})

export const getOpenTaskCountByAssetId = createSelector([
  getOpenTaskById,
], (
  openTaskById,
) => {
  const openTaskCountByAssetId = {}
  Object.entries(openTaskById).forEach(([taskId, task]) => {
    const assetId = task.assetId
    const taskCount = openTaskCountByAssetId[assetId] || 0
    openTaskCountByAssetId[assetId] = taskCount + 1
  })
  return openTaskCountByAssetId
})

export const getTaskPriorityTypes = createSelector([
  getTaskCodeTypes,
], (
  taskCodeTypes,
) => {
  return taskCodeTypes.taskPriorityTypes
})

export const getTaskStatusTypes = createSelector([
  getTaskCodeTypes,
], (
  taskCodeTypes,
) => {
  return taskCodeTypes.taskStatusTypes
})

export const getFocusingTasks = createSelector([
  getTaskById,
  getFocusingAssetId,
], (
  taskById,
  focusingAssetId,
) => {
  // TODO: Consider replacing this with a lookup table
  const focusingTaskIds = Object.keys(taskById).filter(
    taskId => taskById[taskId].assetId === focusingAssetId)
  return focusingTaskIds.map(taskId => taskById[taskId])
})

export const getCurrentTaskComments = createSelector([
  getTaskComments,
], (
  comments,
) => {
  return comments
})
