handleLayerSelect(event) {
  const info = getPickedInfo(event, pick => !pick.isGuide)
  let assetId = info && info.object.properties.id
  if (!assetId) {
    return
  }
  let selectedAssetIndexes = [info.index]
  if (sketchMode === SKETCH_MODE_DELETE) {
    dispatch(deleteAsset(assetId))
    selectedAssetIndexes = []
    assetId = null
  }
  // Update selection in map
  setSelectedAssetIndexes(selectedAssetIndexes)
  setSelectedBusIndexes([])
  // Update focus in detail
  dispatch(setFocusingAssetId(assetId))
  dispatch(setFocusingBusId(null))
},

handleLayerInterpret(event) {
  // const screenCoords = event.screenCoords
  // const newAssetFeature = getPickedFeature(event, pick => pick.isGuide)
  // const oldAssetFeature = getPickedFeature(event, pick => !pick.isGuide)

  /*
  // Find the vertex that the user is editing
  const info = getPickedInfo(event, {isGuide: true})
  if (!info) {
    return
  }
  const vertex = info.object

  // Determine whether the user modified a middle vertex
  const vertexProperties = vertex.properties
  const vertexIndex = vertexProperties.positionIndexes[0]
  const featureIndex = vertexProperties.featureIndex
  const feature = assetsGeoJson.features[featureIndex]
  const featureGeometry = feature.geometry
  if (featureGeometry.type === 'Polygon') {
    return
  }
  const featureVertexCount = featureGeometry.coordinates.length
  const isMiddleVertex = vertexIndex !== 0 &&
    vertexIndex !== featureVertexCount - 1
  if (isMiddleVertex) {
    // Split the line
    return
  }
  const vertexAssetId = feature.properties.id
  const vertexAsset = assetById[vertexAssetId]
  const vertexAssetConnections = vertexAsset.connections || []

  // Find a bus that belongs to another asset
  if (theirBusId) {
    console.log('SET CONNECTION TO THEIR BUS', theirBusId)
    const connection = getConnection(theirBusId)
    dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
    return
  }

  // Find a bus that belongs to this asset
  const ourBusId = getMatchingBusId(
    busAssetId => busAssetId === vertexAssetId)
  if (ourBusId) {
    console.log('KEEP OUR BUS', ourBusId)
    const connection = getConnection(ourBusId)
    dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
    return
  }

  // Make a new bus
  console.log('MAKE A NEW BUS')
  const newBusId = 
  dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
  */

  function getBusId(event, thisAssetId) {
    const screenCoords = event.screenCoords
    const busInfos = deckGL.current.pickMultipleObjects({
      x: screenCoords[0],
      y: screenCoords[1],
      layerIds: [BUSES_MAP_LAYER_ID],
      radius: PICKING_RADIUS_IN_PIXELS,
      depth: PICKING_DEPTH,
    })

    function getMatchingBusId(isMatchingBusAssetId) {
      for (let i = 0; i < busInfos.length; i++) {
        const busInfo = busInfos[i]
        const busId = busInfo.object.properties.id
        const busAssetId = assetIdByBusId[busId]
        if (isMatchingBusAssetId(busAssetId)) {
          return busId
        }
      }
    }

    let busId

    busId = getMatchingBusId(assetId => assetId !== thisAssetId)
    if (busId) return busId

    busId = getMatchingBusId(assetId => assetId === thisAssetId)
    if (busId) return busId

    return getRandomId(MINIMUM_BUS_ID_LENGTH)
  }

  const {
    busId,
    connectionIndex,
    thisAssetId,
    thatAssetId,
  } = getPickedInterpretation(event, getBusId)

  if (thatAssetId) {
    const thatAsset = assetById[thatAssetId]
    // Split the other line
  }

  if (!thisAssetId) {
    return
  }
  // const thisAsset = assetById[thisAssetId]
  // const thisAssetConnections = thisAsset.connections || []
  // const connectionByBusId = getByKey(thisAssetConnections, 'busId')
  // const connection = connectionByBusId[busId] || {busId}
  // dispatch(setAssetConnection(thisAssetId, connectionIndex, connection))
},
