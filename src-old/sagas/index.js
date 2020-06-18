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
  watchRefreshTaskComments,
  watchSaveAssets,
  watchUpdateTask,
  watchUploadAssetsCsv,
} from './asset'

export default function* () {
  yield all([
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
