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
  watchMakeAssetName,
  watchRefreshAssets,
  watchRefreshTaskComments,
  watchSaveAssets,
  watchUpdateTask,
  watchUploadAssetsCsv,
} from './asset'

export default function* () {
  yield all([
    watchRefreshAssets(),
    watchRefreshRisks(),
    watchSaveAssets(),
    watchUploadAssetsCsv(),
    watchMakeAssetName(),
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
