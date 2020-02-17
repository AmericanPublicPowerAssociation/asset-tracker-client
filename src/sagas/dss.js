import {
  takeEvery,
} from 'redux-saga/effects'


import {
  DOWNLOAD_ASSETS_DSS,
} from './constants'

function* watchDownloadAssetsDss() {
  yield takeEvery(DOWNLOAD_ASSETS_DSS, function (action) {
    window.location = '/assets.dss'
  })
}
