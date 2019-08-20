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
  resetAssetTypes,
  resetAssets,
  setAddingAssetErrors,
  setAddingAssetValue,
  setAsset,
  setAssetErrors,
  setAssets,
  setAddingAssetCSVFileErrors,
  setFocusingAsset,
  closeAssetsUploadDialog,
  refreshAssets,
} from './actions'
import {
    ADD_ASSET,
    ADD_ASSET_RELATION,
    CHANGE_ASSET,
    DROP_ASSET_RELATION,
    REFRESH_ASSETS,
    REFRESH_ASSET_TYPES, UPLOAD_ASSETS_CSV_FILE, DOWNLOAD_ASSETS_CSV_FILE,
} from './constants'
import {
  fetchSafely,
} from './macros'
import {
  rinseAsset,
} from './routines'


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

function* watchUploadFileAssets() {
    yield takeEvery(UPLOAD_ASSETS_CSV_FILE, function* (action) {
        var data = new FormData()
        data.append('file', action.payload);
        yield fetchSafely('/assets/', {
            method: 'POST',
            body: data,
        }, {
            on200: function* (asset) {
              yield put(closeAssetsUploadDialog())
              yield put(refreshAssets())
            },
            on400: function* (errors) {
                yield put(closeAssetsUploadDialog())
                yield put(setAddingAssetCSVFileErrors(errors))
            },
        })
    })
}

function* watchDownloadFileAssets() {
    yield takeEvery(DOWNLOAD_ASSETS_CSV_FILE, function* (action) {
      window.location = '/assets.csv';
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
    watchRefreshAssets(),
    watchAddAsset(),
    watchUploadFileAssets(),
    watchDownloadFileAssets(),
    watchChangeAsset(),
    watchAddAssetRelation(),
    watchDropAssetRelation(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
    watchRefreshVulnerableAssets(),
  ])
}
