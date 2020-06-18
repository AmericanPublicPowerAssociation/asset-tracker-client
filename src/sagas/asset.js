import {
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  setAssets,
} from '../actions'
import {
  REFRESH_ASSETS,
} from '../constants'
import {
  // TODO: Move fetchSafely to separate package
  fetchSafely,
} from 'asset-report-risks'

export function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* (action) {
    const url = '/assets.json'
    yield fetchSafely(url, {}, {
      on200: resetAssets,
    })
  })
}

export function* resetAssets(payload) {
  yield put(setAssets(payload))
}
