import {
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  setAssets,
  setAssetsGeojson,
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
      on200: function* (payload) {
        const { assets, assetsGeoJson } = payload
        yield put(setAssets(assets))
        yield put(setAssetsGeojson(assetsGeoJson))
      },
    })
  })
}

export function* watchUpdateAssets() {
  yield takeEvery(UPDATE_ASSETS, function* (action) {
  })
}
