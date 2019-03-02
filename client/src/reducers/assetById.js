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
    return state.mergeDeep({
      [asset.id]: fromJS(asset),
    })
  } else if (TOGGLE_ASSET_RELATION === actionType) {
    const {
      relatingAssetId,
      relatingAssetKey,
      visibleAssetId,
    } = action.payload
    if (relatingAssetId === visibleAssetId) {
      return state
    }
    const relatingAsset = state.get(relatingAssetId)
    const visibleAsset = state.get(visibleAssetId)
    const visibleAssetKey = {
      'connectedIds': 'connectedIds',
      'parentIds': 'childIds',
      'childIds': 'parentIds',
    }[relatingAssetKey]
    const relatingRelatedAssetIds = relatingAsset.get(relatingAssetKey, List())
    const visibleRelatedAssetIds = visibleAsset.get(visibleAssetKey, List())
    const toggle =
      relatingRelatedAssetIds.includes(visibleAssetId) ?
      (assetIds, assetId) => assetIds.filter(x => x !== assetId) :
      (assetIds, assetId) => assetIds.push(assetId)
    return state.merge({
      [relatingAssetId]: relatingAsset.set(relatingAssetKey, toggle(
        relatingRelatedAssetIds, visibleAssetId)),
      [visibleAssetId]: visibleAsset.set(visibleAssetKey, toggle(
        visibleRelatedAssetIds, relatingAssetId)),
    })
  }
  return state
}

export default assetById
