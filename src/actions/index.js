import axios from 'axios'
import {
  REPLACE_ASSETS,
} from '../constants'

export const refreshAssets = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/assets.json')
      const assets = response.data
      dispatch(replaceAssets(assets))
    } catch (error) {
      console.log(error)
    }
  }
}

export const replaceAssets = payload => ({
  type: REPLACE_ASSETS, payload})
