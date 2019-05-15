import {
  MERGE_ASSETS,
  REPLACE_ASSETS,
} from '../constants'


export const refreshAssets = () => {
  return async dispatch => {
    try {
      const response = await fetch('/assets.json')
      const assets = await response.json()
      dispatch(replaceAssets(assets))
    } catch (error) {
      console.log(error)
    }
  }
}


export const addAsset = assetParameters => {
  return async dispatch => {
    try {
      const response = await fetch('/assets.json', {
        method: 'POST',
        body: JSON.stringify(assetParameters),
      })
      const asset = await response.json()
      dispatch(mergeAssets([asset]))
    } catch (error) {
      console.log(error)
    }
  }
}


export const replaceAssets = payload => ({
  type: REPLACE_ASSETS, payload})
export const mergeAssets = payload => ({
  type: MERGE_ASSETS, payload})
