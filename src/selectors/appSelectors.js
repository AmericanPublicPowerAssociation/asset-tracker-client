import { createSelector } from 'reselect'

export const getApp = state => state.app

export const getIsWithRows = createSelector([
  getApp,
], (
  app,
) => {
  return app.isWithRows
})

export const getWindowSize = createSelector([
  getApp,
], (
  app,
) => {
  return app.windowSize
})

export const getIsFullScreenDataDialog = createSelector([
  getApp,
], (
  app,
) => {
  return app.isFullScreenDataDialog
})
