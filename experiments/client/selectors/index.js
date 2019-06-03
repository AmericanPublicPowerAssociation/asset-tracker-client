import { fromJS, Map, List } from 'immutable'
import { find_path as findPath } from 'dijkstrajs'


export const getVisibleAssets = createSelector([
  getSelectedAssetIds,
], (
  selectedAssetIds,
) => {
  return (selectedAssetIds.isEmpty() ? sortedAssetIds : selectedAssetIds)
})


export const getMapSources = createSelector(
      switch (assetTypeId) {
        case 'p':
          featureSize = 2
          break
        case 'l':
          v = asset.get('KV')
          if (v < 10) {
            featureSize = 1
          } else if (v < 50) {
            featureSize = 5
          } else {
            featureSize = 10
          }
          break
        case 's':
        case 'S':
          v = asset.get('KV')
          if (v < 10) {
            featureSize = 10
          } else if (v < 50) {
            featureSize = 20
          } else {
            featureSize = 30
          }
          break
        case 'm':
          v = asset.get('KW')
          if (v < 10) {
            featureSize = 3
          } else if (v < 50) {
            featureSize = 6
          } else {
            featureSize = 9
          }
          break
        case 't':
          featureSize = 3
          break
        case 'x':
          featureSize = 4
          break
        case 'q':
          featureSize = 5
          break
        case 'c':
          featureSize = 6
          break
        case 'b':
          featureSize = 7
          break
        case 'o':
          featureSize = 8
          break
        case 'g':
          featureSize = 9
          break
        default:
          featureSize = 10
      }

export const getMapLayers = createSelector([
  getFocusingAssetId,
  getSelectedAssetTypeIds,
  getSelectedAssetIds,
  getMapSources,
], (
  focusingAssetId,
  selectedAssetTypeIds,
  selectedAssetIds,
  mapSources,
) => selectedAssetTypeIds
    .map(typeId => {
      let layerColor = {
        p: 'black',
        l: 'yellow',
        m: 'blue',
        t: 'pink',
        x: 'magenta',
        q: 'green',
        c: 'violet',
        b: 'gray',
        o: 'brown',
        g: 'darkred',
        s: 'orange',
        S: 'red',
        X: 'white',
      }[typeId]
      if (isLine) {
        const matchExpression = ['match', ['get', 'id']]
        if (focusingAssetId) {
          matchExpression.push(focusingAssetId, 'blue')
        }
        if (selectedAssetIds.size) {
          matchExpression.push(selectedAssetIds.filter(id => id !== focusingAssetId).toJS(), 'cyan')
        }
        matchExpression.push(layerColor)
        if (matchExpression.length > 3) {
          layerColor = matchExpression
        }
      }
    }))

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
