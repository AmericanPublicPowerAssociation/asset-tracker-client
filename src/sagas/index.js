import {
  all,
} from 'redux-saga/effects'
import  {
  watchRefreshRisks,
  watchSuggestProductNames,
  watchSuggestProductVersions,
  watchSuggestVendorNames,
} from 'asset-report-risks'
import {
  watchAddTask,
  watchAddTaskComment,
  watchAssetTasks,
  watchFillAssetName,
  watchRefreshAssets,
  // watchRefreshTasks,
  watchRefreshTaskComments,
  watchSaveAssets,
  watchUpdateTask,
  watchUploadAssetsCsv,
} from './asset'
import {
  watchSetSelection,
} from './map'

export default function* () {
  yield all([
    watchSetSelection(),
    watchRefreshAssets(),
    // TODO: Review below code
    // watchRefreshTasks(),
    watchRefreshRisks(),
    watchSaveAssets(),
    watchUploadAssetsCsv(),
    watchFillAssetName(),
    watchAssetTasks(),
    watchAddTask(),
    watchUpdateTask(),
    watchRefreshTaskComments(),
    watchAddTaskComment(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
  ])
}
