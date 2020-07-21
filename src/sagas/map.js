import {
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import {
  centerMap,
  setSelectedAssetId,
  setSelectedAssetIndexes,
  setSelectedBusId,
  setSelectedBusIndexes,
} from '../actions'
import {
  SELECTED_ASSET_ID,
  SELECTED_ASSET_INDEXES,
  SELECTED_BUS_ID,
  SELECTED_BUS_INDEXES,
  SET_SELECTION,
} from '../constants'
import {
  getAssetsGeoJson,
  getBestAssetIdByBusId,
  getBusesGeoJson,
} from '../selectors'
import {
  findSelectedFeatureIndices,
} from '../routines'

export function* watchSetSelection() {
  yield takeLatest(SET_SELECTION, function* (action) {
    let { assetId, assetIndexes, busId, busIndexes } = action.payload
    let shouldCenterMap = true
    let centeredFeature
    const assetsGeoJson = yield select(getAssetsGeoJson)
    const busesGeoJson = yield select(getBusesGeoJson)
    const assetFeatures = assetsGeoJson.features
    const busFeatures = busesGeoJson.features

    if (busIndexes && busIndexes.length) {
      if (!busId) {
        busId = busFeatures[busIndexes[0]].properties.id
      }
      shouldCenterMap = false
    }
    if (busId) {
      if (!busIndexes) {
        busIndexes = findSelectedFeatureIndices(busId, busFeatures)
        centeredFeature = busFeatures[busIndexes[0]]
      }
      if (!assetId) {
        const bestAssetIdByBusId = yield select(getBestAssetIdByBusId)
        assetId = bestAssetIdByBusId[busId]
      }
    }
    if (assetIndexes && assetIndexes.length) {
      if (!assetId) {
        assetId = assetFeatures[assetIndexes[0]].properties.id
      }
      shouldCenterMap = false
    }
    if (assetId) {
      if (!assetIndexes) {
        assetIndexes = findSelectedFeatureIndices(assetId, assetFeatures)
        if (!centeredFeature) {
          centeredFeature = assetFeatures[assetIndexes[0]]
        }
      }
    }

    const actions = [
      setSelectedAssetId(assetId || SELECTED_ASSET_ID),
      setSelectedAssetIndexes(assetIndexes || SELECTED_ASSET_INDEXES),
      setSelectedBusId(busId || SELECTED_BUS_ID),
      setSelectedBusIndexes(busIndexes || SELECTED_BUS_INDEXES),
    ]
    if (shouldCenterMap && centeredFeature) {
      actions.push(centerMap(centeredFeature))
    }
    yield all(actions.map(_ => put(_)))
  })
}
