import axios from 'axios'
import {
  MERGE_ASSETS,
  REPLACE_ASSETS,
} from '../constants'


export const refreshAssets = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/assets.json')
      dispatch(replaceAssets(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}


export const addAsset = asset => {
  return async dispatch => {
    try {
      const response = await axios.post('/assets.json', asset)
      dispatch(mergeAssets([response.data]))
    } catch (error) {
      console.log(error)
    }
  }
}


export const replaceAssets = payload => ({
  type: REPLACE_ASSETS, payload})
export const mergeAssets = payload => ({
  type: MERGE_ASSETS, payload})
