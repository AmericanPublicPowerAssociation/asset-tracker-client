import {
  all,
} from 'redux-saga/effects'
import {
  watchRefreshAssets,
} from './asset'

export default function* () {
  yield all([
    watchRefreshAssets(),
  ])
}
