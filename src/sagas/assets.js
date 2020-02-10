import {
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  setAssets,
} from '../actions'
import {
  REFRESH_ASSETS,
  UPDATE_ASSETS,
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

function* resetAssets(payload) {
  yield put(setAssets(payload))
}
