import {
  MERGE_ASSETS,
  REPLACE_ASSETS,
  SET_ASSET_NAME_QUERY,
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
          const error = await response.json()
          alert(JSON.stringify(error))
          break
        default:
          const text = await response.text()
          console.log(text)
      }
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
      switch (response.status) {
        case 200:
          const asset = await response.json()
          dispatch(mergeAssets([asset]))
          break
        case 400:
          const error = await response.json()
          alert(JSON.stringify(error))
          break
        default:
          const text = await response.text()
          console.log(text)
      }
    } catch (error) {
      console.log(error)
    }
  }
}


export const replaceAssets = payload => ({
  type: REPLACE_ASSETS, payload})
export const mergeAssets = payload => ({
  type: MERGE_ASSETS, payload})
export const setAssetNameQuery = payload => ({
  type: SET_ASSET_NAME_QUERY, payload})
