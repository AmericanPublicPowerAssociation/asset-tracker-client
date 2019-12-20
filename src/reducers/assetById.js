import produce from 'immer'
import {
  ASSET_BY_ID,
} from '../constants'

const initialState = ASSET_BY_ID

const assetById = produce((draft, action) => {
}, initialState)

export default assetById
