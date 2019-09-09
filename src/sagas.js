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
  watchSuggestVendorNames,
  watchSuggestProductNames,
  watchSuggestProductVersions,
  watchRefreshRisks,
} from 'asset-report-risks'
import {
  closeAssetsUploadDialog,
  excludeAssetRelation,
  includeAssetRelation,
  refreshAssetsKit,
  resetAssetsKit,
  resetAssetsLogs,
  resetTasks,
  setAddingAssetCSVFileErrors,
  setAddingAssetErrors,
  setAddingAssetValue,
  setAsset,
  // setTask,
  setAssetErrors,
  setAssets,
  setFocusingAsset,
} from './actions'
import {
  ADD_ASSET,
  // ADD_TASK,
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  DROP_ASSET_RELATION,
  REFRESH_ASSETS_KIT,
  REFRESH_ASSETS_LOGS,
  REFRESH_TASKS,
  UPLOAD_ASSETS_CSV,
  DOWNLOAD_ASSETS_CSV,
} from './constants'
import {
  fetchSafely,
} from './macros'
import {
  rinseAsset,
  // rinseTask,
} from './routines'


function* watchRefreshAssetsKit() {
  yield takeLatest(REFRESH_ASSETS_KIT, function* () {
    yield fetchSafely('/assetsKit.json', {}, {
      on200: function* (assetsKit) {
        yield put(resetAssetsKit(assetsKit))
      },
    }) 
  })
}


function* watchRefreshAssetsLogs() {
  yield takeLatest(REFRESH_ASSETS_LOGS, function* () {
    yield fetchSafely('/assetsLogs.json', {}, {
      on200: function* (assetsLogs) {
        yield put(resetAssetsLogs(assetsLogs))
      },
    }) 
  })
}


function* watchRefreshTasks() {
  yield takeLatest(REFRESH_TASKS, function* () {
    yield fetchSafely('/tasks.json', {}, {
      on200: function* (assetTasks) {
        yield put(resetTasks(assetTasks))
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
        yield put(setAddingAssetValue({isOpen: false, errors: Map()}))
        yield put(setFocusingAsset({id: asset.get('id')}))
      },
      on400: function* (errors) {
        yield put(setAddingAssetErrors(errors))
      },
    })
  })
}


// function* watchAddTask() {
//   yield takeEvery(ADD_TASK, function* (action) {
//     const payload = rinseTask(action.payload)
//     yield fetchSafely('/tasks.json', {
//       method: 'POST',
//       body: JSON.stringify(payload),
//     }, {
//       on200: function* (task) {
//         yield put(setTask(task))
//         yield put(setAddingTaskValue({isOpen: false, errors: Map()}))
//         yield put(setFocusingTask({id: task.get('id')}))
//       },
//       on400: function* (errors) {
//         yield put(setAddingTaskErrors(errors))
//       },
//     })
//   })
// }


function* watchUploadAssetsCsv() {
    yield takeEvery(UPLOAD_ASSETS_CSV, function* (action) {
        var data = new FormData()
        data.append('file', action.payload);
        yield fetchSafely('/assets.csv', {
          // method: 'PATCH',
            method: 'POST',
            body: data,
        }, {
            on200: function* (asset) {
              yield put(closeAssetsUploadDialog())
              yield put(refreshAssetsKit())
            },
            on400: function* (errors) {
              yield put(closeAssetsUploadDialog())
              yield put(setAddingAssetCSVFileErrors(errors))
            },
        })
    })
}


function* watchDownloadFileAssets() {
  yield takeEvery(DOWNLOAD_ASSETS_CSV, function (action) {
    window.location = '/assets.csv'
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
    watchRefreshAssetsLogs(),
    watchRefreshTasks(),
    watchAddAsset(),
    // watchAddTask(),
    watchUploadAssetsCsv(),
    watchDownloadFileAssets(),
    watchChangeAsset(),
    watchAddAssetRelation(),
    watchDropAssetRelation(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
    watchRefreshRisks(),
  ])
}
