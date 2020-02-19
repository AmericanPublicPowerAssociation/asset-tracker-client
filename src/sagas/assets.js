import {
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  setAssets,
  setTasks,
} from '../actions'
import {
  REFRESH_ASSETS,
  UPDATE_ASSETS,
  REFRESH_TASKS
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

export function* resetTasks(payload) {
  yield put(setTasks(payload))
}

export function* resetAssets(payload) {
  yield put(setAssets(payload))
}
