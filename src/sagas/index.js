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
  watchRefreshAssets,
  watchUpdateAssets,
  watchAddTask,
  watchAssetTasks,
  watchUpdateTask,
  watchRefreshTaskComments,
  watchAddTaskComment,
} from './assets'

export default function* () {
  yield all([
    watchRefreshAssets(),
    watchRefreshRisks(),
    watchUpdateAssets(),
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
