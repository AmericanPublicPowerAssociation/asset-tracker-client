import { ADD_ASSET } from '../constants'
import { TOGGLE_SELECTED_ASSET_TYPE } from '../constants'

export const addAsset = asset => ({
  type: ADD_ASSET, asset})

export const toggleSelectedAssetType = assetTypeId => ({
  type: TOGGLE_SELECTED_ASSET_TYPE, assetTypeId})
