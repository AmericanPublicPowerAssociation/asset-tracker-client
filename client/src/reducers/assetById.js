import { List, fromJS } from 'immutable'
import {
  ASSET_BY_ID,
  ADD_ASSET,
  UPDATE_ASSET,
  TOGGLE_ASSET_RELATION,
} from '../constants'

const initialState = ASSET_BY_ID

const assetById = (state=initialState, action) => {
  const actionType = action.type

  if (ADD_ASSET === actionType || UPDATE_ASSET === actionType) {
    const asset = action.payload
    return state.merge({
      [asset.id]: fromJS(asset),
    })
  } else if (TOGGLE_ASSET_RELATION === actionType) {
    const {
      exposedAssetId,
      exposedAssetKey,
      visibleAssetId,
    } = action.payload
    if (exposedAssetId === visibleAssetId) {
      return state
    }
    const exposedAsset = state.get(exposedAssetId)
    const visibleAsset = state.get(visibleAssetId)
    const visibleAssetKey = {
      'connectedIds': 'connectedIds',
      'parentIds': 'childIds',
      'childIds': 'parentIds',
    }[exposedAssetKey]
    const exposedRelatedAssetIds = exposedAsset.get(exposedAssetKey, List())
    const visibleRelatedAssetIds = visibleAsset.get(visibleAssetKey, List())
    const toggle =
      exposedRelatedAssetIds.includes(visibleAssetId) ?
      (assetIds, assetId) => assetIds.filter(x => x !== assetId) :
      (assetIds, assetId) => assetIds.push(assetId)
    return state.merge({
      [exposedAssetId]: exposedAsset.set(exposedAssetKey, toggle(
        exposedRelatedAssetIds, visibleAssetId)),
      [visibleAssetId]: visibleAsset.set(visibleAssetKey, toggle(
        visibleRelatedAssetIds, exposedAssetId)),
    })
  }
  return state
}

export default assetById
