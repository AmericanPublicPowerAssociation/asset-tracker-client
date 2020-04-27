import {
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  refreshTaskComments,
  refreshTasks,
  setAssets,
  setTaskCommentCount,
  setTaskComments,
  setTasks,
} from '../actions'
import {
  ADD_TASK,
  ADD_TASK_COMMENT,
  REFRESH_ASSETS,
  REFRESH_TASKS,
  REFRESH_TASK_COMMENTS,
  SAVE_ASSETS,
  UPDATE_TASK,
} from '../constants'
import {
  fetchSafely,
} from '../macros'
import {
  getAssetById,
  getAssetsGeoJson,
} from '../selectors'

export function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* (action) {
    const url = '/assets.json'
    yield fetchSafely(url, {}, {
      on200: resetAssets,
    })
  })
}

export function* watchSaveAssets() {
  yield takeEvery(SAVE_ASSETS, function* (action) {
    const url = '/assets.json'
    const assetById = yield select(getAssetById)
    const assets = Object.values(assetById)
    const assetsGeoJson = yield select(getAssetsGeoJson)
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify({ assets, assetsGeoJson }),
    }, {
      on200: resetAssets,
    })
  })
}

export function* watchAssetTasks() {
  yield takeLatest(REFRESH_TASKS, function* (action) {
    const url = '/tasks.json'
    yield fetchSafely(url, {}, {
      on200: resetTasks,
    })
  })
}

export function* watchAddTask() {
  yield takeEvery(ADD_TASK, function* (action) {
    const url = '/tasks.json'
    const payload = action.payload
    const body = {
      ...payload,
      priority: parseInt(payload['priority']),
      status: parseInt(payload['status']),
    }
    yield fetchSafely(url, {
      method: 'POST',
      body: JSON.stringify(body),
    }, {
      on200: updateTasks,
    })
  })
}

export function* watchUpdateTask() {
  yield takeEvery(UPDATE_TASK, function* (action) {
    const url = `/tasks/${action.payload.taskId}.json`
    const payload = action.payload
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, {
      on200: updateTasks,
    })
  })
}

export function* watchRefreshTaskComments() {
  yield takeLatest(REFRESH_TASK_COMMENTS, function* (action) {
    const taskId = action.payload.taskId
    const url = `/tasks/${taskId}/comments.json`
    yield fetchSafely(url, {}, {
      on200: (comments) => updateComments({ taskId, comments }),
    })
  })
}

export function* watchAddTaskComment() {
  yield takeEvery(ADD_TASK_COMMENT, function* (action) {
    const payload = action.payload
    const taskId = action.payload.taskId
    const url = `/tasks/${taskId}/comments.json`

    yield fetchSafely(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    }, {
      on200: () => put(refreshTaskComments(taskId)),
    })
  })
}

export function* updateTasks() {
  yield put(refreshTasks())
}

export function* resetTasks(payload) {
  yield put(setTasks(payload))
}

export function* resetAssets(payload) {
  yield put(setAssets(payload))
}

export function* updateComments(payload) {
  const {
    comments,
    taskId,
  } = payload
  const commentCount = comments.length
  yield put(setTaskComments(payload))
  yield put(setTaskCommentCount(taskId, commentCount))
}
