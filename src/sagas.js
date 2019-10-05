import {
  all,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import { Map } from 'immutable'
import {
  watchRefreshAuth,
} from 'appa-auth-consumer'
import {
  watchRefreshRisks,
  watchSuggestProductNames,
  watchSuggestProductVersions,
  watchSuggestVendorNames,
} from 'asset-report-risks'
import {
  closeAssetsUploadDialog,
  excludeAssetRelation,
  includeAssetRelation,
  refreshAssetsKit,
  resetAssetsKit,
  resetDashboards,
  resetLogs,
  resetTasks,
  setAddingAssetCSVFileErrors,
  setAddingAssetErrors,
  setAddingAssetValues,
  setAsset,
  setAssetErrors,
  setAssets,
  setEditingTaskErrors,
  setEditingTaskValues,
  setFocusingAsset,
  setTask,
  sortAssets,
} from './actions'
import {
  ADD_ASSET,
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  DOWNLOAD_ASSETS_CSV,
  DROP_ASSET_RELATION,
  EDIT_TASK,
  REFRESH_ASSETS_KIT,
  REFRESH_ASSET_TASKS,
  REFRESH_DASHBOARDS,
  REFRESH_LOGS,
  REFRESH_TASKS,
  UPLOAD_ASSETS_CSV,
  DOWNLOAD_ASSETS_DSS,
} from './constants'
import {
  fetchSafely,
} from './macros'
import {
  rinseAsset,
  rinseTask,
} from './routines'


function* watchRefreshDashboards() {
  yield takeLatest(REFRESH_DASHBOARDS, function* () {
    yield fetchSafely('/dashboards.json', {}, {
      on200: function* (dashboards) {
        yield put(resetDashboards(dashboards))
      },
    })
  })
}


function* watchRefreshAssetsKit() {
  yield takeLatest(REFRESH_ASSETS_KIT, function* (action) {
    const payload = action.payload
    const { column, desc } = payload
    if (!column && desc == null) {
      yield fetchSafely('/assetsKit.json', {}, {
        on200: function* (assetsKit) {
          yield put(resetAssetsKit(assetsKit))
        },
      })
    }
    else {
      const url = `/assetsKit.json?column=${column}&desc=${desc}`
      yield fetchSafely(url, {}, {
        on200: function* (assetsKit) {
          const payload = assetsKit.merge({column, desc})
          yield put(sortAssets(payload))
        }
      })
    }
  })
}


function *watchRefreshAssetTasks() {
  yield takeLatest(REFRESH_ASSET_TASKS, function* (action) {
    const payload = action.payload
    const { id } = payload
    const url = `/assets/${id}/tasks.json`
    yield fetchSafely(url, {}, {
      on200: function* (tasks) {
        yield put(resetTasks(tasks))
      },
    })
  })
}


function* watchRefreshLogs() {
  yield takeLatest(REFRESH_LOGS, function* () {
    yield fetchSafely('/logs.json', {}, {
      on200: function* (logs) {
        yield put(resetLogs(logs))
      },
    })
  })
}


function* watchRefreshTasks() {
  yield takeLatest(REFRESH_TASKS, function* () {
    yield fetchSafely('/tasks.json', {}, {
      on200: function* (tasks) {
        yield put(resetTasks(tasks))
      },
    })
  })
}


function* watchAddAsset() {
  yield takeEvery(ADD_ASSET, function* (action) {
    const payload = rinseAsset(action.payload)
    yield fetchSafely('/assets.json', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, {
      on200: function* (asset) {
        yield put(setAsset(asset))
        yield put(setAddingAssetValues({isOpen: false, errors: Map()}))
        yield put(setFocusingAsset({id: asset.get('id')}))
      },
      on400: function* (errors) {
        yield put(setAddingAssetErrors(errors))
      },
    })
  })
}


function* watchEditTask() {
  yield takeEvery(EDIT_TASK, function* (action) {
    const payload = rinseTask(action.payload)
    const id = payload.get('id')
    const url = id ? `/tasks/${id}.json` : '/tasks.json'
    const method = id ? 'PATCH' : 'POST'
    yield fetchSafely(url, {
      method,
      body: JSON.stringify(payload),
    }, {
      on200: function* (task) {
        yield put(setTask(task))
        yield put(setEditingTaskValues({isOpen: false, errors: Map()}))
      },
      on400: function* (errors) {
        yield put(setEditingTaskErrors(errors))
      },
    })
  })
}


function* watchUploadAssetsCsv() {
    yield takeEvery(UPLOAD_ASSETS_CSV, function* (action) {
        var data = new FormData();
        data.append('file', action.payload.file);
        data.append('overwrite', action.payload.overwrite);
        yield fetchSafely('/assets.csv', {
            method: 'PATCH',
            body: data,
        }, {
            on200: function* (asset) {
              yield put(closeAssetsUploadDialog());
              yield put(refreshAssetsKit())
            },
            on400: function* (errors) {
              yield put(closeAssetsUploadDialog());
              yield put(setAddingAssetCSVFileErrors(errors))
            },
        })
    })
}


function* watchDownloadAssetsCsv() {
  yield takeEvery(DOWNLOAD_ASSETS_CSV, function (action) {
    window.location = '/assets.csv'
  })
}


function* watchDownloadAssetsDss() {
  yield takeEvery(DOWNLOAD_ASSETS_DSS, function (action) {
    window.location = '/assets.dss'
  })
}


function* watchChangeAsset() {
  yield takeEvery(CHANGE_ASSET, function* (action) {
    const payload = action.payload
    const { id } = payload
    const url = `/assets/${id}.json`
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, {
      on200: function* (assets) {
        yield put(setAssets(assets))
      },
      on400: function* (errors) {
        yield put(setAssetErrors({id, errors}))
      },
    })
  })
}


function* watchAddAssetRelation() {
  yield takeEvery(ADD_ASSET_RELATION, function* (action) {
    const actionPayload = action.payload
    const { id, key, otherId } = actionPayload
    const url = `/assets/${id}/${key}/${otherId}.json`
    yield put(includeAssetRelation(actionPayload))
    yield fetchSafely(url, {
      method: 'PATCH',
    }, {
      on200: function* (assets) {
        yield put(setAssets(assets))
      },
      on400: function* (errors) {
        yield put(excludeAssetRelation(actionPayload))
      },
    })
  })
}


function* watchDropAssetRelation() {
  yield takeEvery(DROP_ASSET_RELATION, function* (action) {
    const actionPayload = action.payload
    const { id, key, otherId } = actionPayload
    const url = `/assets/${id}/${key}/${otherId}.json`
    yield put(excludeAssetRelation(actionPayload))
    yield fetchSafely(url, {
      method: 'DELETE',
    }, {
      on200: function* (assets) {
        yield put(setAssets(assets))
      },
      on400: function* (errors) {
        yield put(includeAssetRelation(actionPayload))
      },
    })
  })
}


export default function* () {
  yield all([
    watchRefreshAuth(),
    watchRefreshAssetsKit(),
    watchRefreshAssetTasks(),
    watchRefreshLogs(),
    watchRefreshTasks(),
    watchAddAsset(),
    watchEditTask(),
    watchUploadAssetsCsv(),
    watchDownloadAssetsCsv(),
    watchDownloadAssetsDss(),
    watchChangeAsset(),
    watchAddAssetRelation(),
    watchDropAssetRelation(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
    watchRefreshRisks(),
    watchRefreshDashboards(),
  ])
}
