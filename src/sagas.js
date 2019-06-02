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
  watchRefreshVulnerableAssets,
} from 'asset-vulnerability-report'
import {
  excludeAssetRelation,
  includeAssetRelation,
  logError,
  setAddingAssetErrors,
  setAddingAssetValue,
  setAppValue,
  setAsset,
  setAssetErrors,
  setAssetTypes,
  setAssets,
  setFocusingAsset,
} from './actions'
import {
  ADD_ASSET,
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  DROP_ASSET_RELATION,
  REFRESH_ASSETS,
  REFRESH_ASSET_TYPES,
  SIGN_IN,
  SIGN_OUT,
} from './constants'
import {
  rinseAsset,
} from './routines'


function* watchRefreshAssetTypes() {
  yield takeLatest(REFRESH_ASSET_TYPES, function* () {
    yield fetchSafely('/assetTypes.json', {}, {
      on200: function* (assetTypes) {
        yield put(setAssetTypes(assetTypes))
      },
    })
  })
}


function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* () {
    yield fetchSafely('/assets.json', {}, {
      on200: function* (assets) {
        yield put(setAssets(assets))
      },
    })
  })
}


function* watchAddAsset() {
  yield takeEvery(ADD_ASSET, function* (action) {
    const payload = rinseAsset(action.payload)
    yield fetchSafely('/assets.json', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, {
      on200: function* (asset) {
        yield put(setAsset(asset))
        yield put(setAddingAssetValue({isOpen: false, errors: Map()}))
        yield put(setFocusingAsset({id: asset.get('id')}))
      },
      on400: function* (errors) {
        yield put(setAddingAssetErrors(errors))
      },
    })
  })
}


function* watchChangeAsset() {
  yield takeEvery(CHANGE_ASSET, function* (action) {
    const payload = rinseAsset(action.payload)
    const id = payload.get('id')
    const url = `/assets/${id}.json`
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, {
      on200: function* (asset) {
        yield put(setAsset(asset))
      },
      on400: function* (errors) {
        yield put(setAssetErrors({id, errors}))
      },
    })
  })
}


function* watchAddAssetRelation() {
  yield takeEvery(ADD_ASSET_RELATION, function* (action) {
    const actionPayload = action.payload
    const { id, key, otherId } = actionPayload
    const url = `/assets/${id}/${key}/${otherId}.json`
    yield put(includeAssetRelation(actionPayload))
    yield fetchSafely(url, {
      method: 'PATCH',
    }, {
      on400: function* (errors) {
        yield put(excludeAssetRelation(actionPayload))
      },
    })
  })
}


function* watchDropAssetRelation() {
  yield takeEvery(DROP_ASSET_RELATION, function* (action) {
    const actionPayload = action.payload
    const { id, key, otherId } = actionPayload
    const url = `/assets/${id}/${key}/${otherId}.json`
    yield put(excludeAssetRelation(actionPayload))
    yield fetchSafely(url, {
      method: 'DELETE',
    }, {
      on400: function* (errors) {
        yield put(includeAssetRelation(actionPayload))
      },
    })
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


export function* fetchSafely(url, options, callbacks) {
  try {
    const response = yield call(fetch, url, options)
    const status = response.status
    const { on200, on400 } = callbacks
    if (on200 && 200 === status) {
      yield on200(fromJS(yield response.json()))
    } else if (on400 && 400 === status) {
      yield on400(fromJS(yield response.json()))
    } else {
      yield put(logError({status}))
    }
  } catch (error) {
    yield put(logError({text: error}))
  }
}


export default function* () {
  yield all([
    watchRefreshAssetTypes(),
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
    watchRefreshVulnerableAssets(),
  ])
}
