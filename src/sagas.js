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
  replaceAssetErrors,
  replaceAssets,
  setAddingAssetErrors,
  setAddingAssetValue,
  setAppValue,
  setFocusingAsset,
} from './actions'
import {
  ADD_ASSET,
  CHANGE_ASSET,
  REFRESH_ASSETS,
  SIGN_IN,
  SIGN_OUT,
} from './constants'
import {
  rinseAsset,
} from './routines'


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
          yield put(logError({status: response.status}))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


function* watchAddAsset() {
  yield takeEvery(ADD_ASSET, function* addAsset(action) {
    const payload = rinseAsset(action.payload)
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
          yield put(setFocusingAsset({id: asset.get('id')}))
          break
        }
        case 400:
          const errors = fromJS(yield response.json())
          yield put(setAddingAssetErrors(errors))
          break
        default:
          yield put(logError({status: response.status}))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


function* watchChangeAsset() {
  yield takeEvery(CHANGE_ASSET, function* changeAsset(action) {
    const payload = rinseAsset(action.payload)
    const id = payload.get('id')
    const url = '/assets/_.json'.replace('_', id)
    try {
      const response = yield call(fetch, url, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      })
      switch (response.status) {
        case 200: {
          const asset = fromJS(yield response.json())
          yield put(replaceAsset(asset))
          break
        }
        case 400: {
          const asset = fromJS({id, errors: yield response.json()})
          yield put(replaceAssetErrors(asset))
          break
        }
        default:
          yield put(logError({status: response.status}))
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
    watchChangeAsset(),
    watchSignIn(),
    watchSignOut(),
  ])
}
