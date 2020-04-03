import {
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  refreshTasks,
  setAssetComments,
  setAssets,
  setTasks,
  setTaskCommentCount,
  updateTaskComments,
} from '../actions'
import {
  REFRESH_ASSETS,
  UPDATE_ASSETS,
  REFRESH_TASKS,
  ADD_TASK,
  UPDATE_TASK, REFRESH_ASSET_COMMENTS, ADD_TASK_COMMENT
} from '../constants'
import {
  fetchSafely,
} from '../macros'

export function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* (action) {
    const url = '/assets.json'
    yield fetchSafely(url, {}, {
      on200: resetAssets,
    })
  })
}

export function* watchUpdateAssets() {
  yield takeEvery(UPDATE_ASSETS, function* (action) {
    const url = '/assets.json'
    const payload = action.payload
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
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

    yield fetchSafely(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    }, {
      on200: updateTasks,
    })
  })
}

export function* watchUpdateTask() {
  yield takeEvery(UPDATE_TASK, function* (action) {
    const url = `/tasks/${action.payload.task_id}.json`
    const payload = action.payload
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, {
      on200: updateTasks,
    })
  })
}

export function* watchRefreshAssetComments() {
  yield takeLatest(REFRESH_ASSET_COMMENTS, function* (action) {
    const task_id = action.payload.task_id;

    const url = `/tasks/${task_id}/comments.json`
    yield fetchSafely(url, {}, {
      on200: (comments) => updateComments({task_id, comments}),
    })
  })
}

export function* watchAddTaskComment() {
  yield takeEvery(ADD_TASK_COMMENT, function* (action) {
    const payload = action.payload
    const task_id = action.payload.task_id;
    const url = `/tasks/${task_id}/comments.json`

    yield fetchSafely(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    }, {
      on200: () => put(updateTaskComments(task_id)),
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
    task_id,
  } = payload
  const commentCount = comments.length
  yield put(setAssetComments(payload))
  yield put(setTaskCommentCount(task_id, commentCount))
}
