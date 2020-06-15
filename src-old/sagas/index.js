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
