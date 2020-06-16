export const getSelectedAssetId = state => state.selectedAssetId

export const getAssetCount = createSelector([
  getAssetById,
], (
  assetById,
) => {
  return Object.keys(assetById).length
})

export const getAssetIdsByBusId = createSelector([
  getTemporaryAssetById,
], (
  temporaryAssetById,
) => {
  const assetIdsByBusId = {}
  for (const [assetId, asset] of Object.entries(temporaryAssetById)) {
    if (asset['isDeleted']) {
      continue
    }
    for (const connection of Object.values(asset.connections || {})) {
      const { busId } = connection
      const assetIds = assetIdsByBusId[busId] || []
      assetIdsByBusId[busId] = [...assetIds, assetId]
    }
  }
  return assetIdsByBusId
})

export const getSelectedAsset = createSelector([
  getSelectedAssetId,
  getAssetById,
], (
  selectedAssetId,
  assetById,
) => {
  let asset = assetById[selectedAssetId]
  if (asset) {
    asset = Object.assign({}, asset)
    asset.id = selectedAssetId
  }
  return asset
})
