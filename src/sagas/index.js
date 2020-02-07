import {
  all,
} from 'redux-saga/effects'
import  {
  watchRefreshRisks,
  watchSuggestProductNames,
  watchSuggestProductVersions,
  watchSuggestVendorNames,
} from 'asset-report-risks'
import {
  watchRefreshAssets,
  watchUpdateAssets,
} from './assets'

export default function* () {
  yield all([
    watchRefreshAssets(),
    watchRefreshRisks(),
    watchUpdateAssets(),
    watchSuggestVendorNames(),
    watchSuggestProductNames(),
    watchSuggestProductVersions(),
  ])
}
