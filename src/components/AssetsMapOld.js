  function handleBusesGeoJsonClick(info, event) {
    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      setLineBusId(busId)
      // If we already started a line,
      if (selectedAssetIndexes.length) {
        // End the line
        changeSketchMode(SKETCH_MODE_ADD, busId)
      }
    } else {
      if (info.picked) {
        const busIndex = info.index
        setSelectedBusIndexes([busIndex])
      }
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Delete') {
      if (focusingAssetId && sketchMode.startsWith(SKETCH_MODE_EDIT)) {
        openDeleteAssetDialog()
      }
    }
  }

/*
*    and we clicked on a bus
*       add a connection to that bus
*        show snackbar
*    and we did not click on a bus
*       add a connection to a new bus
* if we are ending the line
*    and we clicked on a bus
*       add a connection to that bus
*       end the connection
*        clear selected asset indexes
*        show snackbar
*/


  function handleAssetsGeoJsonClick(info, event) {
    const assetId = info.object.properties.id
    if (assetId && sketchMode.startsWith(SKETCH_MODE_DELETE)) {
      dispatch(setFocusingAssetId(null))
      setSelectedAssetIndexes([])
      setSelectedBusIndexes([])
      dispatch(deleteAsset(assetId))
      return
    }
    assetId && dispatch(setFocusingAssetId(assetId))
    assetId && dispatch(setFocusingBusId(null))
    if (sketchMode.startsWith(SKETCH_MODE_ADD) || info.isGuide) return
    const featureIndex = info.index
    setSelectedAssetIndexes([featureIndex])
    setSelectedBusIndexes([])
  }

  function handleAssetsGeoJsonEdit({ editType, editContext, updatedData }) {
    switch(editType) {
      // If a feature is being added for the first time,
      case 'addFeature': {
        const features = updatedData.features
        const { featureIndexes } = editContext
        // Add an asset corresponding to the feature
        const assetTypeCode = getAssetTypeCode(sketchMode)
        const assetType = assetTypeByCode[assetTypeCode]
        const asset = makeAsset(assetType, lineBusId)
        dispatch(setAsset(asset))
        // Store assetId in feature
        const assetId = asset.id
        for (let i = 0; i < featureIndexes.length; i++) {
          const featureIndex = featureIndexes[i]
          const feature = features[featureIndex]
          feature.properties.id = assetId
          feature.properties.typeCode = assetTypeCode
        }
        // If the new feature is a line,
        if (sketchMode === SKETCH_MODE_ADD_LINE) {
          // Have subsequent clicks extend the same line
          setSelectedAssetIndexes(featureIndexes)
        } else {
          changeSketchMode(SKETCH_MODE_ADD)
        }
        dispatch(setFocusingAssetId(assetId))  // Show details for the new asset
        break
      }
      default: {}
    }
    dispatch(setAssetsGeoJson(updatedData))  // Update geojson for assets
  }

  function handleAssetsGeoJsonInterpret(event) {
    // Find nearest bus
    const screenCoords = event.screenCoords
    const busInfos = deckGL.current.pickMultipleObjects({
      x: screenCoords[0],
      y: screenCoords[1],
      layerIds: [BUSES_GEOJSON_LAYER_ID],
      radius: pickingRadius,
      depth: pickingDepth,
    })
    // Determine whether the user modified a middle vertex
    const vertex = getPickedEditHandle(event.picks)
    if (!vertex) {
      return
    }
    const vertexProperties = vertex.properties
    const vertexIndex = vertexProperties.positionIndexes[0]
    const featureIndex = vertexProperties.featureIndex
    const feature = assetsGeoJson.features[featureIndex]
    const featureVertexCount = feature.geometry.coordinates.length
    const isMiddleVertex = vertexIndex !== 0 &&
      vertexIndex !== featureVertexCount - 1
    if (isMiddleVertex) {
      // Split the line
      console.log('isMiddleVertex')
      return
    }

    const vertexAssetId = feature.properties.id
    const vertexAsset = assetById[vertexAssetId]
    const vertexAssetConnections = vertexAsset.connections || []
    const connectionByBusId = getByKey(vertexAssetConnections, 'busId')
    // console.log(connectionByBusId)
    const connectionIndex = vertexIndex === 0 ? 0 : 1
    // console.log(connectionByBusId)

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

    function getConnection(busId) {
      return connectionByBusId[busId] || { busId }
    }

    // Find a bus that belongs to another asset
    const theirBusId = getMatchingBusId(
      busAssetId => busAssetId !== vertexAssetId)
    if (theirBusId) {
      console.log('SET CONNECTION TO THEIR BUS', theirBusId)
      const connection = getConnection(theirBusId)
      console.log(vertexAssetId, connectionIndex, connection)
      dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
      return
    }

    // Find a bus that belongs to this asset
    const ourBusId = getMatchingBusId(
      busAssetId => busAssetId === vertexAssetId)
    if (ourBusId) {
      console.log('KEEP OUR BUS', ourBusId)
      const connection = getConnection(ourBusId)
      console.log(vertexAssetId, connectionIndex, connection)
      dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
      return
    }

    // Make a new bus
    console.log('MAKE A NEW BUS')
    const newBusId = getRandomId(MINIMUM_BUS_ID_LENGTH)
    const connection = getConnection(newBusId)
    console.log(vertexAssetId, connectionIndex, connection)
    dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))

    // console.log('pickingInfo', event, nearestBusInfos)
  }

  function handleBusesGeoJsonClick(info, event) {
    const busId = info.object.properties.id
    const assetId = assetIdByBusId[busId]

    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      setLineBusId(busId)
      // If we already started a line,
      if (selectedAssetIndexes.length) {
        // End the line
        changeSketchMode(SKETCH_MODE_ADD, busId)
      }
    }
    else {
      if (info.picked) {
        const busIndex = info.index
        setSelectedBusIndexes([busIndex])
        dispatch(setFocusingBusId(busId))
      }
    }

    // busId && dispatch(setFocusingBusId(busId))
    assetId && dispatch(setFocusingAssetId(assetId))
  }

  /*
  function onKeyUp(e) {
    e.preventDefault()
    if (e.key === 'Enter') {
      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        changeSketchMode(SKETCH_MODE_ADD)
      }
    }
    else if (e.key === 'Delete') {
      if (focusingAssetId &&
          sketchMode.startsWith(SKETCH_MODE_EDIT)
        ) {
        openDeleteAssetDialog()
      }
    }
  }
  */

