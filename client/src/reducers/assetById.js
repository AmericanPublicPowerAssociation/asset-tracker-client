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
    const {id, ...asset} = action.payload
    return {...state, [id]: asset}
  } else if (TOGGLE_ASSET_RELATION === actionType) {
    const {
      exposedAssetId,
      exposedAssetKey,
      visibleAssetId,
    } = action.payload
    if (exposedAssetId === visibleAssetId) {
      return state
    }
    const exposedAsset = state[exposedAssetId]
    const visibleAsset = state[visibleAssetId]
    const visibleAssetKey = {
      'connectedIds': 'connectedIds',
      'parentIds': 'childIds',
      'childIds': 'parentIds',
    }[exposedAssetKey]
    const exposedRelatedAssetIds = exposedAsset[exposedAssetKey] || []
    const visibleRelatedAssetIds = visibleAsset[visibleAssetKey] || []
    const toggle =
      exposedRelatedAssetIds.includes(visibleAssetId) ?
      (assetIds, assetId) => assetIds.filter(x => x !== assetId) :
      (assetIds, assetId) => [...assetIds, assetId]
    return {
      ...state,
      [exposedAssetId]: {
        ...exposedAsset,
        [exposedAssetKey]: toggle(exposedRelatedAssetIds, visibleAssetId)},
      [visibleAssetId]: {
        ...visibleAsset,
        [visibleAssetKey]: toggle(visibleRelatedAssetIds, exposedAssetId)},
    }
  }
  return state
}

export default assetById
