import { find_path as findPath } from 'dijkstrajs'


export const getVisibleAssets = createSelector([
  getSelectedAssetIds,
], (
  selectedAssetIds,
) => {
  return (selectedAssetIds.isEmpty() ? sortedAssetIds : selectedAssetIds)
})


        if (selectedAssetIds.size) {
          matchExpression.push(selectedAssetIds.filter(id => id !== focusingAssetId).toJS(), 'cyan')
        }

export const getInteractiveLayerIds = createSelector([
  getMapLayers,
], (
  mapLayers,
) => mapLayers.map(layer => layer.id))

export const getConnectionGraph = createSelector([
  getAssetById,
], (
  assetById,
) => {
  const connectionGraph = {}
  assetById.forEach((asset, id) => {
    const connectedIds = asset.get('connectedIds', List())
    if (!connectedIds.size) return
    const weightByConnectedId = connectedIds.reduce((d, id) => {
      d[id] = 1
      return d
    }, {})
    connectionGraph[id] = weightByConnectedId
  })
  return connectionGraph
})

export const getMeterAssetIds = createSelector([
  getAssetById,
], (
  assetById,
) => {
  const meterAssetIds = []
  assetById.forEach((asset, id) => {
    if (asset.get('typeId') === 'm') meterAssetIds.push(id)
  })
  return meterAssetIds
})

export const getSwitchAssetIds = createSelector([
  getAssetById,
], (
  assetById,
) => {
  const switchAssetIds = []
  assetById.forEach((asset, id) => {
    if (asset.get('typeId') === 'x') switchAssetIds.push(id)
  })
  return switchAssetIds
})

export const getRootAssetIds = createSelector([
  getAssetById,
  getConnectionGraph,
], (
  assetById,
  connectionGraph,
) => {
  const rootAssetIds = []
  assetById.forEach((asset, id) => {
    const assetTypeId = asset.get('typeId')
    /*
    if (['o', 'g'].includes(assetTypeId)) {
      rootAssetIds.push(id)
    } else if (['s', 'S'].includes(assetTypeId)) {
      const childIds = asset.get('childIds')
      rootAssetIds.push(...childIds)
    }
    */
    if (['s', 'S'].includes(assetTypeId)) {
      const childIds = asset.get('childIds', [])
      for (const childId of childIds) {
        if (childId in connectionGraph) {
          rootAssetIds.push(childId)
          break
        }
      }
    }
  })
  return rootAssetIds.filter(assetId => assetId in connectionGraph)
})

export const getCircuitAssetIdPairs = createSelector([
  getFocusingAssetId,
  getRootAssetIds,
  getConnectionGraph,
  getAssetById,
], (
  focusingAssetId,
  rootAssetIds,
  connectionGraph,
  assetById,
) => {
  if (!(focusingAssetId in connectionGraph)) return []
  const circuitAssetIdPairs = new Set()
  rootAssetIds.forEach(assetId => {
    const assetIds = findPath(connectionGraph, focusingAssetId, assetId)
      .filter(assetId => assetById.get(assetId).get('typeId') !== 'l')
    for (let i = 0; i < assetIds.length - 1; i++) {
      const ids = [assetIds[i], assetIds[i + 1]]
      ids.sort()
      circuitAssetIdPairs.add(ids.join(' '))
    }
  })
  return [...circuitAssetIdPairs].map(idPair => idPair.split(' '))
})
