import { fromJS } from 'immutable'
import {
  replaceAsset,
  replaceAssets,
} from '../actions'
import {
  ADD_ASSET,
  CHANGE_ASSET,
  REFRESH_ASSETS,
  SERVER,
  SERVER_ASSETS_URL,
  SERVER_ASSET_URL,
} from '../constants'


const FETCH_BY_TYPE = {
  [REFRESH_ASSETS]: {
    method: 'GET',
    url: SERVER_ASSETS_URL,
    onSuccess: replaceAssets,
  },
  [ADD_ASSET]: {
    method: 'POST',
    url: SERVER_ASSETS_URL,
    onSuccess: replaceAsset,
  },
  [CHANGE_ASSET]: {
    method: 'PATCH',
    url: SERVER_ASSET_URL,
    onSuccess: replaceAsset,
  },
}


const serverApi = ({ dispatch, getState }) => next => async action => {
  const { payload, callback, api, type } = action
  if (SERVER !== api) {
    return next(action)
  }
  const { method, url, onSuccess } = FETCH_BY_TYPE[type]
  const options = {
    method,
  }
  if (method !== 'GET') {
    options.body = JSON.stringify(payload)
  }
  try {
    const response = await fetch(url.replace('_', payload.id), options)
    const data = fromJS(await response.json())
    switch (response.status) {
      case 200:
        dispatch(onSuccess(data))
        callback.onSuccess && callback.onSuccess(data)
        break
      case 400:
        callback.onError && callback.onError(data)
        break
      default:
        alert(await response.text())
    }
  } catch (error) {
    alert(error)
  }
}


export default serverApi
