import {
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import produce from 'immer'
import getCentroid from '@turf/centroid'
import {
  fetchSafely,  // TODO: Move to separate package
  refreshRisks,
} from 'asset-report-risks'
import {
  refreshAssets,
  refreshTaskComments,
  refreshTasks,
  setAssetValue,
  setAssets,
  setTaskCommentCount,
  setTaskComments,
  setTasks,
} from '../actions'
import {
  ADD_TASK,
  ADD_TASK_COMMENT,
  DELETE_ASSET,
  DELETE_ASSET_CONNECTION,
  FILL_ASSET_NAME,
  REFRESH_ASSETS,
  REFRESH_TASKS,
  REFRESH_TASK_COMMENTS,
  SAVE_ASSETS,
  UPDATE_TASK,
  UPLOAD_ASSETS_CSV,
} from '../constants'
import {
  getBusOrphanInfo,
} from '../routines'
import {
  getAssetById,
  getAssetIdsByBusId,
  getAssetsGeoJson,
} from '../selectors'

const {
  REACT_APP_GOOGLE_TOKEN,
} = process.env

export function* watchRefreshAssets() {
  yield takeLatest(REFRESH_ASSETS, function* (action) {
    const url = '/assets.json'
    yield fetchSafely(url, {}, {
      on200: resetAssets,
    })
  })
}

export function* watchDeleteAsset() {
  yield takeEvery(DELETE_ASSET, function* (action) {
    let assetById = yield select(getAssetById)
    let assetsGeoJson = yield select(getAssetsGeoJson)
    const assetIdsByBusId = yield select(getAssetIdsByBusId)
    const assetId = action.payload
    const assetFeatures = assetsGeoJson.features
    const asset = assetById[assetId]
    const connectionByIndex = asset.connections

    // Find orphan line midpoint connections
    const busOrphanInfos = []
    for (const connection of Object.values(connectionByIndex)) {
      const { busId } = connection
      const busOrphanInfo = getBusOrphanInfo(
        busId, assetId, assetById, assetIdsByBusId, assetFeatures)
      if (!busOrphanInfo) continue
      busOrphanInfos.push(busOrphanInfo)
    }

    assetById = produce(assetById, draft => {
      for (const [connectedAssetId, vertexIndex] of busOrphanInfos) {
        delete draft[connectedAssetId].connections[vertexIndex]
      }
      draft[assetId].isDeleted = true
    })
    assetsGeoJson = produce(assetsGeoJson, draft => {
      draft.features = assetFeatures.filter(f => f.properties.id !== assetId)
    })
    yield put(setAssets({ assetById, assetsGeoJson }))
  })
}

export function* watchDeleteAssetConnection() {
  yield takeEvery(DELETE_ASSET_CONNECTION, function* (action) {
    let busOrphanInfo
    let assetById = yield select(getAssetById)
    let assetIdsByBusId = yield select(getAssetIdsByBusId)
    let assetsGeoJson = yield select(getAssetsGeoJson)
    const assetFeatures = assetsGeoJson.features

    const { assetId, vertexIndex } = action.payload
    const connection = assetById[assetId].connections[vertexIndex]
    if (connection) {
      const { busId } = connection
      busOrphanInfo = getBusOrphanInfo(
        busId, assetId, assetById, assetIdsByBusId, assetFeatures)
    }

    assetById = produce(assetById, draft => {
      if (busOrphanInfo) {
        const [connectedAssetId, connectedVertexIndex] = busOrphanInfo
        delete draft[connectedAssetId].connections[connectedVertexIndex]
      }
      delete draft[assetId].connections[vertexIndex]
    })
    yield put(setAssets({ assetById }))
  })
}

export function* resetAssets(payload) {
  yield put(setAssets(payload))
}

// TODO: Review below code

export function* watchSaveAssets() {
  yield takeEvery(SAVE_ASSETS, function* (action) {
    const url = '/assets.json'
    const assetById = yield select(getAssetById)
    const assetsGeoJson = yield select(getAssetsGeoJson)
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify({ assetById, assetsGeoJson }),
    }, {
      on200: function*(payload) {
        yield resetAssets(payload)
        yield updateTasks()
        yield put(refreshRisks())
      },
    })
  })
}

export function* watchFillAssetName() {
  yield takeEvery(FILL_ASSET_NAME, function* (action) {
    const { assetId, feature } = action.payload
    const centroid = getCentroid(feature)
    const [longitude, latitude] = centroid.geometry.coordinates
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${REACT_APP_GOOGLE_TOKEN}`
    yield fetchSafely(url, {}, {
      on200: function* ({ results }) {
        if (!results.length) return
        const assetName = results[0].formatted_address
        yield put(setAssetValue(assetId, 'name', assetName))
      },
    })
  })
}

export function* watchAssetTasks() {
  yield takeLatest(REFRESH_TASKS, function* (action) {
    const url = '/tasks.json'
    yield fetchSafely(url, {}, {
      on200: resetTasks,
    })
  })
}

export function* watchAddTask() {
  yield takeEvery(ADD_TASK, function* (action) {
    const url = '/tasks.json'
    const payload = action.payload
    const body = {
      ...payload,
      priority: parseInt(payload['priority']),
      status: parseInt(payload['status']),
    }
    yield fetchSafely(url, {
      method: 'POST',
      body: JSON.stringify(body),
    }, {
      on200: updateTasks,
    })
  })
}

export function* watchUpdateTask() {
  yield takeEvery(UPDATE_TASK, function* (action) {
    const url = `/tasks/${action.payload.taskId}.json`
    const payload = action.payload
    yield fetchSafely(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, {
      on200: updateTasks,
    })
  })
}

// TODO: Move task sagas to task.js
export function* watchRefreshTaskComments() {
  yield takeLatest(REFRESH_TASK_COMMENTS, function* (action) {
    const taskId = action.payload.taskId
    const url = `/tasks/${taskId}/comments.json`
    yield fetchSafely(url, {}, {
      on200: (comments) => updateTaskComments({ taskId, comments }),
    })
  })
}

export function* watchAddTaskComment() {
  yield takeEvery(ADD_TASK_COMMENT, function* (action) {
    const payload = action.payload
    const taskId = action.payload.taskId
    const url = `/tasks/${taskId}/comments.json`

    yield fetchSafely(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    }, {
      on200: () => put(refreshTaskComments(taskId)),
    })
  })
}

export function* updateTasks() {
  yield put(refreshTasks())
}

export function* resetTasks(payload) {
  yield put(setTasks(payload))
}

export function* updateTaskComments(payload) {
  const {
    comments,
    taskId,
  } = payload
  const commentCount = comments.length
  yield put(setTaskComments(payload))
  yield put(setTaskCommentCount(taskId, commentCount))
}

export function* watchUploadAssetsCsv() {
  yield takeEvery(UPLOAD_ASSETS_CSV, function* (action) {
    const data = new FormData()
    data.append('file', action.payload.file)
    data.append('overwrite', action.payload.overwrite)

    yield fetchSafely('/assets.csv', {
      method: 'PATCH',
      body: data,
    }, {
      on200: function* (response) {
        yield put(refreshAssets())
        action.payload.onClose(response)
      },
      on400: function* (response) {
        yield put(refreshAssets())
        action.payload.onClose(response)
      },
    })
  })
}

// TODO: Review above code
