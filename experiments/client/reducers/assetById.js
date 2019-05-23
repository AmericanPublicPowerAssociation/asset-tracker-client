if (TOGGLE_ASSET_RELATION === actionType) {
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
