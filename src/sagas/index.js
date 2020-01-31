import {
  all,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  setAssets,
} from '../actions'
import {
  REFRESH_ASSETS_KIT,
} from '../constants'
import {
  fetchSafely,
} from '../macros'


function* watchRefreshAssetsKit() {
  yield takeLatest(REFRESH_ASSETS_KIT, function* (action) {
    const url = '/assetsKit.json'
    yield fetchSafely(url, {}, {
      on200: function* (assetsKit) {
        const { assets } = assetsKit
        yield put(setAssets(assets))
      },
    })
  })
}


export default function* () {
  yield all([
    watchRefreshAssetsKit(),
  ])
}
