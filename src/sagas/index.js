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
  watchRefreshAuth,
} from 'appa-auth-consumer'
import {
  // watchRefreshTasks,
  watchAddTask,
  watchAddTaskComment,
  watchAssetTasks,
  watchDeleteAsset,
  watchFillAssetName,
  watchRefreshAssets,
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
    watchFillAssetName(),
    watchRefreshAssets(),
    // TODO: Review below code
    // watchRefreshTasks(),
    watchRefreshRisks(),
    watchSaveAssets(),
    watchDeleteAsset(),
    watchUploadAssetsCsv(),
    watchAssetTasks(),
    watchAddTask(),
    watchUpdateTask(),
    watchRefreshTaskComments(),
    watchAddTaskComment(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
    watchRefreshAuth(),
  ])
}
