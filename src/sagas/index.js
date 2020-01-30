import {
  all,
  put,
  takeEvery,
} from 'redux-saga/effects'
import {
  fetchSafely,
} from '../macros'
import {
  CHANGE_ASSET
} from '../constants'


export default function* () {
  yield all([])
}


function* watchChangeAsset() {
  yield takeEvery(CHANGE_ASSET, function* (action) {
    const payload =action.payload
    const { id } = payload
    const url = `/assets/${id}.json`
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, {
      on200: function* (assets) {
        //yield put(setAssets(assets))
      },
      on400: function* (errors) {
        //yield put(setAssetErrors({id, errors}))
      },
    })
  })
}
