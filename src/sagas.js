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
  resetAssetsPack,
  resetAssetTypes,
  resetAssets,
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
  REFRESH_ASSETS_PACK,
  REFRESH_ASSETS,
  REFRESH_ASSET_TYPES,
} from './constants'
import {
  fetchSafely,
} from './macros'
import {
  rinseAsset,
} from './routines'


function* watchRefreshAssetsPack() {
  yield takeLatest(REFRESH_ASSETS_PACK, function* () {
    yield fetchSafely('/assetsPack.json', {}, {
      on200: function* (assetsPack) {
        yield put(resetAssetsPack(assetsPack))
      },
    }) 
  })
}


function* watchRefreshAssetTypes() {
  yield takeLatest(REFRESH_ASSET_TYPES, function* () {
    yield fetchSafely('/assetTypes.json', {}, {
      on200: function* (assetTypes) {
        yield put(resetAssetTypes(assetTypes))
      },
    })
  })
}


function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* () {
    yield fetchSafely('/assets.json', {}, {
      on200: function* (assets) {
        yield put(resetAssets(assets))
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
    watchRefreshAssetTypes(),
    watchRefreshAssetsPack(),
    watchRefreshAssets(),
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
