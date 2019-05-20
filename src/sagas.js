import { fromJS } from 'immutable'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  logError,
  replaceAssets,
} from './actions'
import {
  REFRESH_ASSETS,
} from './constants'


function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* refreshAssets() {
    try {
      const response = yield call(fetch, '/assets.json')
      switch (response.status) {
        case 200:
          yield put(replaceAssets(fromJS(yield response.json())))
          break
        default:
          yield put(logError({
            status: response.status,
            text: yield response.text(),
          }))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


export default function* reduceSaga() {
  yield all([
    watchRefreshAssets(),
  ])
}
