import {
  all,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import { Map } from 'immutable'
import {
  watchRefreshAuth,
} from 'appa-auth-consumer'
import {
  watchSuggestVendorNames,
  watchSuggestProductNames,
  watchSuggestProductVersions,
  watchRefreshVulnerableAssets,
} from 'asset-vulnerability-report'
import {
  excludeAssetRelation,
  includeAssetRelation,
  resetAssetsKit,
  setAddingAssetErrors,
  setAddingAssetValue,
  setAsset,
  setAssetErrors,
  setAssets,
  setFocusingAsset,
} from './actions'
import {
  ADD_ASSET,
  ADD_ASSET_RELATION,
  CHANGE_ASSET,
  DROP_ASSET_RELATION,
  REFRESH_ASSETS_KIT,
} from './constants'
import {
  fetchSafely,
} from './macros'
import {
  rinseAsset,
} from './routines'


function* watchRefreshAssetsKit() {
  yield takeLatest(REFRESH_ASSETS_KIT, function* () {
    yield fetchSafely('/assetsKit.json', {}, {
      on200: function* (assetsKit) {
        yield put(resetAssetsKit(assetsKit))
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
    const payload = action.payload
    const { id } = payload
    const url = `/assets/${id}.json`
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, {
      on200: function* (assets) {
        yield put(setAssets(assets))
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
      on200: function* (assets) {
        yield put(setAssets(assets))
      },
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
      on200: function* (assets) {
        yield put(setAssets(assets))
      },
      on400: function* (errors) {
        yield put(includeAssetRelation(actionPayload))
      },
    })
  })
}


export default function* () {
  yield all([
    watchRefreshAuth(),
    watchRefreshAssetsKit(),
    watchAddAsset(),
    watchChangeAsset(),
    watchAddAssetRelation(),
    watchDropAssetRelation(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
    watchRefreshVulnerableAssets(),
  ])
}
