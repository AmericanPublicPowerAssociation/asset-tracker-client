import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteAsset,
  setAsset,
  setAssetConnection,
  setAssetsGeoJson,
  setFocusingAssetId,
  setFocusingBusId,
} from '../actions'
import {
  BUSES_GEOJSON_LAYER_ID,
  MINIMUM_BUS_ID_LENGTH,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_DELETE,
} from '../constants'
import {
  getByKey,
  getRandomId,
} from '../macros'
import {
  getAssetTypeCode,
  getPickedInfo,
  makeAsset,
} from '../routines'

export function usePickableLayer(
  sketchMode,
  setSelectedAssetIndexes,
  setSelectedBusIndexes,
) {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleLayerSelect(event) {
      const info = getPickedInfo(event, {})
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
  }), [
    dispatch,
    sketchMode,
    setSelectedAssetIndexes,
    setSelectedBusIndexes,
  ])
}

export function useEditableLayer(
  sketchMode,
  assetTypeByCode,
  lineBusId,
  setSelectedAssetIndexes,
  changeSketchMode,
) {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleLayerEdit({editType, editContext, updatedData}) {
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
          // Show details for the new asset
          dispatch(setFocusingAssetId(assetId))
          break
        }
        default: {}
      }
      // Update geojson for assets
      dispatch(setAssetsGeoJson(updatedData))
    },
  }), [
    dispatch,
    sketchMode,
    assetTypeByCode,
    lineBusId,
    setSelectedAssetIndexes,
    changeSketchMode,
  ])
}

export function useInterpretableLayer(
  assetsGeoJson,
  assetById,
  assetIdByBusId,
  deckGL,
) {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleLayerInterpret(event) {
      console.log('INTERPRET')

      // Find the vertex that the user is editing
      const info = getPickedInfo(event, {isGuide: true})
      if (!info) {
        return
      }

      // Determine whether the user modified a middle vertex
      const vertexProperties = info.object.properties
      console.log(vertexProperties)
      const vertexIndex = vertexProperties.positionIndexes[0]
      const featureIndex = vertexProperties.featureIndex
      const feature = assetsGeoJson.features[featureIndex]
      const featureVertexCount = feature.geometry.coordinates.length
      const isMiddleVertex = vertexIndex !== 0 &&
        vertexIndex !== featureVertexCount - 1
      if (isMiddleVertex) {
        // Split the line
        console.log('INTERPRET', 'isMiddleVertex', vertexIndex)
        return
      }
      const vertexAssetId = feature.properties.id
      const vertexAsset = assetById[vertexAssetId]
      const vertexAssetConnections = vertexAsset.connections || []
      const connectionByBusId = getByKey(vertexAssetConnections, 'busId')
      const connectionIndex = vertexIndex === 0 ? 0 : 1

      // Find nearest bus
      const screenCoords = event.screenCoords
      const busInfos = deckGL.current.pickMultipleObjects({
        x: screenCoords[0],
        y: screenCoords[1],
        layerIds: [BUSES_GEOJSON_LAYER_ID],
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

      function getConnection(busId) {
        return connectionByBusId[busId] || {busId}
      }

      // Find a bus that belongs to another asset
      const theirBusId = getMatchingBusId(
        busAssetId => busAssetId !== vertexAssetId)
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
      const newBusId = getRandomId(MINIMUM_BUS_ID_LENGTH)
      const connection = getConnection(newBusId)
      dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
    },
  }), [
    dispatch,
    assetsGeoJson,
    assetById,
    assetIdByBusId,
    deckGL,
  ])
}
