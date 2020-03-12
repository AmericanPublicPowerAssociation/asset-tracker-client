import { createSelector } from 'reselect'


export const getTaskById = state => state.taskById

export const getTaskByIdLength = createSelector([
  getTaskById,
], (
  taskById,
) => {
  return Object.keys(taskById).length
})
