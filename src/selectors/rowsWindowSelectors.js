import { createSelector } from 'reselect'

export const getRowsWindow = state => state.rowsWindow

export const getIsWithRows = createSelector([
  getRowsWindow
], (
  rowsWindow
) => {
  return rowsWindow.isWithRows
})
