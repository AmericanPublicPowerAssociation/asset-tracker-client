import { Map } from 'immutable'
import {
  ADD_SELECTED_ASSET_TYPE,
  MERGE_ASSETS,
  REPLACE_ASSETS,
  SET_ASSET_NAME_QUERY,
  TOGGLE_SELECTED_ASSET_TYPE,
} from '../constants'


export const refreshAssets = () => {
  return async dispatch => {
    try {
      const response = await fetch('/assets.json')
      switch (response.status) {
        case 200:
          const assets = await response.json()
          dispatch(replaceAssets(assets))
          break
        case 400:
          const errorByKey = await response.json()
          alert(errorByKey)
          break
        default:
          const text = await response.text()
          alert(text)
      }
    } catch (error) {
      alert(error)
    }
  }
}


export const addAsset = (assetParameters, onSuccess, onError) => {
  console.log(onSuccess)
  console.log(onError)
  return async dispatch => {
    try {
      const response = await fetch('/assets.json', {
        method: 'POST',
        body: JSON.stringify(assetParameters),
      })
      switch (response.status) {
        case 200:
          const asset = await response.json()
          dispatch(mergeAssets([asset]))
          onSuccess(asset)
          break
        case 400:
          const errorByKey = await response.json()
          onError(Map(errorByKey))
          break
        default:
          const text = await response.text()
          alert(text)
      }
    } catch (error) {
      alert(error)
    }
  }
}


export const replaceAssets = payload => ({
  type: REPLACE_ASSETS, payload})
export const mergeAssets = payload => ({
  type: MERGE_ASSETS, payload})
export const setAssetNameQuery = payload => ({
  type: SET_ASSET_NAME_QUERY, payload})
export const toggleSelectedAssetType = payload => ({
  type: TOGGLE_SELECTED_ASSET_TYPE, payload})
export const addSelectedAssetType = payload => ({
  type: ADD_SELECTED_ASSET_TYPE, payload})
