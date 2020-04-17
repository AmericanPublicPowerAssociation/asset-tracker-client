import { createSelector } from 'reselect'
import {
  TASK_STATUS_DONE,
  TASK_STATUS_CANCELLED,
} from '../constants'


export const getTaskById = state => state.taskById
export const getTaskCodeTypes = state => state.taskCodeTypes

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

export const getOpenTaskByIdLength = createSelector([
  getOpenTaskById,
], (
  openTaskById,
) => {
  return openTaskById.length
})


export const getTaskPriorityTypes = createSelector([
  getTaskCodeTypes,
], (
  taskCodeTypes
) => {
  return taskCodeTypes.taskPriorityTypes
})

export const getTaskStatusTypes = createSelector([
  getTaskCodeTypes,
], (
  taskCodeTypes
) => {
  return taskCodeTypes.taskStatusTypes
})
