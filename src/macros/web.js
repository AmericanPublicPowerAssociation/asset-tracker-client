import {
  call,
  put,
} from 'redux-saga/effects'
import { 
  logError,
} from '../actions'

export function* fetchSafely(url, options, callbacks) {
  const response = yield call(fetch, url, options)
  const status = response.status
  const { on200, on400 } = callbacks
  if (on200 && status === 200) {
    yield on200(yield response.json())
  } else if (on400 && status === 400) {
    yield on400(yield response.json())
  } else {
    yield put(logError({ status }))
  }
}
