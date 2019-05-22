import { Map, fromJS } from 'immutable'
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects'
import { appaAuthClient } from 'appa-auth-client'
import {
  logError,
  replaceAsset,
  replaceAssets,
  setAddingAssetValue,
  setAppValue,
} from './actions'
import {
  ADD_ASSET,
  REFRESH_ASSETS,
  SIGN_IN,
  SIGN_OUT,
} from './constants'


function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* refreshAssets() {
    try {
      const response = yield call(fetch, '/assets.json')
      switch (response.status) {
        case 200: {
          const assets = fromJS(yield response.json())
          yield put(replaceAssets(assets))
          break
        }
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


function* watchAddAsset() {
  yield takeEvery(ADD_ASSET, function* addAsset(action) {
    const { payload } = action
    delete payload.isOpen
    delete payload.errors
    try {
      const response = yield call(fetch, '/assets.json', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      switch (response.status) {
        case 200: {
          const asset = fromJS(yield response.json())
          yield put(replaceAsset(asset))
          yield put(setAddingAssetValue({isOpen: false, errors: Map()}))
          // yield put(includeAssetFilterKey({typeId: asset.get('typeId')}))
          break
        }
        case 400:
          const errors = fromJS(yield response.json())
          yield put(setAddingAssetValue({errors}))
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


function* watchSignIn() {
  yield takeLeading(SIGN_IN, function* signIn() {
    const authState = yield appaAuthClient.signIn()
    yield put(setAppValue(authState))
  })
}


function* watchSignOut() {
  yield takeLeading(SIGN_OUT, function* signOut() {
    const authState = yield appaAuthClient.signOut()
    yield put(setAppValue(authState))
  })
}


export default function* reduceSaga() {
  yield all([
    watchRefreshAssets(),
    watchAddAsset(),
    watchSignIn(),
    watchSignOut(),
  ])
}
