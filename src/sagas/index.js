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
  watchRefreshAssetComments,
  watchAddTaskComment,
  watchUploadAssetsCsv
} from './assets'

export default function* () {
  yield all([
    watchRefreshAssets(),
    watchRefreshRisks(),
    watchUpdateAssets(),
    watchAssetTasks(),
    watchAddTask(),
    watchUpdateTask(),
    watchRefreshAssetComments(),
    watchAddTaskComment(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
    watchUploadAssetsCsv()
  ])
}
