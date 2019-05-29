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
  watchSuggestVendorNames,
  watchSuggestProductNames,
  watchSuggestProductVersions,
} from 'asset-vulnerability-report'
import {
  excludeAssetRelation,
  includeAssetRelation,
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
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  DROP_ASSET_RELATION,
  REFRESH_ASSETS,
  SIGN_IN,
  SIGN_OUT,
} from './constants'
import {
  rinseAsset,
} from './routines'


function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* () {
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
  yield takeEvery(ADD_ASSET, function* (action) {
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
  yield takeEvery(CHANGE_ASSET, function* (action) {
    const payload = rinseAsset(action.payload)
    const id = payload.get('id')
    const url = `/assets/${id}.json`
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


function* watchAddAssetRelation() {
  yield takeEvery(ADD_ASSET_RELATION, function* (action) {
    const actionPayload = action.payload
    const { id, key, otherId } = actionPayload
    const url = `/assets/${id}/${key}/${otherId}.json`
    yield put(includeAssetRelation(actionPayload))
    try {
      const response = yield call(fetch, url, {
        method: 'PATCH',
      })
      switch (response.status) {
        case 400:
          yield put(excludeAssetRelation(actionPayload))
          break
        default:
          yield put(logError({status: response.status}))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


function* watchDropAssetRelation() {
  yield takeEvery(DROP_ASSET_RELATION, function* (action) {
    const actionPayload = action.payload
    const { id, key, otherId } = actionPayload
    const url = `/assets/${id}/${key}/${otherId}.json`
    yield put(excludeAssetRelation(actionPayload))
    try {
      const response = yield call(fetch, url, {
        method: 'DELETE',
      })
      switch (response.status) {
        case 400:
          yield put(includeAssetRelation(actionPayload))
          break
        default:
          yield put(logError({status: response.status}))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


function* watchSignIn() {
  yield takeLeading(SIGN_IN, function* () {
    const authState = yield appaAuthClient.signIn()
    yield put(setAppValue(authState))
  })
}


function* watchSignOut() {
  yield takeLeading(SIGN_OUT, function* () {
    const authState = yield appaAuthClient.signOut()
    yield put(setAppValue(authState))
  })
}


export default function* () {
  yield all([
    watchRefreshAssets(),
    watchAddAsset(),
    watchChangeAsset(),
    watchAddAssetRelation(),
    watchDropAssetRelation(),
    watchSignIn(),
    watchSignOut(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
  ])
}
