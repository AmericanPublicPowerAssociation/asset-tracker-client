import { useDispatch, useSelector } from 'react-redux'
import { produce } from 'immer'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { ViewMode } from '@nebula.gl/edit-modes'
import {
  // makeAssetName,
  deleteAsset,
  removeLineEndPoint,
  fillAssetName,
  setAsset,
  setAssetConnection,
  setAssetsGeoJson,
  setEditingAsset,
  setFocusingAssetId,
  setFocusingBusId,
  setMapViewState,
  setSelectedAssetIndexes,
  setSketchMode,
} from '../actions'
import {
  ASSETS_MAP_LAYER_ID,
  ASSET_LINE_WIDTH_IN_METERS,
  ASSET_RADIUS_IN_METERS_BY_CODE,
  ASSET_TYPE_CODE_LINE,
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_ASSET,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_DELETE,
  SKETCH_MODE_EDIT,
} from '../constants'
import {
  CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getFeaturePack,
  getMapMode,
  // getPickedEditHandle,
  makeBusId,
  makeEditingAsset,
  updateFeature,
} from '../routines'
import {
  getAssetIdByBusId,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  getEditingAsset,
  getFocusingAssetId,
  getSelectedAssetIndexes,
  getSelectedBusIndexes,
  getSketchMode,
} from '../selectors'

export function useMovableMap() {
  const dispatch = useDispatch()
  return {
    handleMapMove({ viewState }) {
      dispatch(setMapViewState(viewState))
    },
  }
}

export function useEditableMap(deckGL) {
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  let editingAsset = useSelector(getEditingAsset)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const focusingAssetId = useSelector(getFocusingAssetId)
  const selectedAssetIndexes = useSelector(getSelectedAssetIndexes)
  const selectedBusIndexes = useSelector(getSelectedBusIndexes)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const colors = useSelector(getColors)
  const assetTypeCode = getAssetTypeCode(sketchMode)
  const isAddingLine = sketchMode === SKETCH_MODE_ADD_LINE

  function getAssetsMapLayer() {
    const mapMode = getMapMode(sketchMode)

    function handleAssetEdit(event) {
      const { editType, editContext, updatedData } = event
      console.log('asset edit', editType, editContext, updatedData)

      if (editType === 'addTentativePosition') {
        if (!editingAsset.id) {
          editingAsset = makeEditingAsset(assetTypeCode)
        }
        if (isAddingLine) {
          // Look for nearby objects
          const { position } = editContext
          const screenCoords = deckGL.current.viewports[0].project(position)
          const nearbyAssetInfos = deckGL.current.pickMultipleObjects({
            x: screenCoords[0],
            y: screenCoords[1],
            layerIds: [ASSETS_MAP_LAYER_ID],
            radius: PICKING_RADIUS_IN_PIXELS,
            depth: PICKING_DEPTH,
          })
          console.log('nearbyAssetInfos', nearbyAssetInfos)
          const nearbyBusInfos = deckGL.current.pickMultipleObjects({
            x: screenCoords[0],
            y: screenCoords[1],
            layerIds: [BUSES_MAP_LAYER_ID],
            radius: PICKING_RADIUS_IN_PIXELS,
            depth: PICKING_DEPTH,
          })
          console.log('nearbyBusInfos', nearbyBusInfos)
          // Convert objects into features
          const nearbyAssetFeatures = nearbyAssetInfos.map(info => info.object)
          const nearbyBusFeatures = nearbyBusInfos.map(info => info.object)
          // Get editing feature
          const editingAssetFeature = nearbyAssetFeatures.find(
            feature => feature.properties.guideType)
          const vertexCount = editingAssetFeature ?
            editingAssetFeature.geometry.coordinates.length : 1
          console.log('vertexCount', vertexCount)
          // Add connection to nearby bus or make a new bus
          let busId
          if (nearbyBusFeatures.length) {
            busId = nearbyBusFeatures[0].properties.id
          } else if (vertexCount === 1) {
            busId = makeBusId()
          }
          if (busId) {
            editingAsset = produce(editingAsset, draft => {
              draft.connections[vertexCount - 1] = { busId }
            })
          }
        }
        dispatch(setEditingAsset(editingAsset))
      } else if (editType === 'finishMovePosition') {
        console.log('finishMovePosition', event)
        const { position, positionIndexes, featureIndexes } = editContext
        const { features } = updatedData
        const asset = features[featureIndexes[0]]
        const assetId = asset.properties.id

        switch (asset.properties.typeCode) {
          case ASSET_TYPE_CODE_LINE: {
            const assetVertexCount = asset.geometry.coordinates.length
            const assetVertexIndex = positionIndexes[0]
            if (assetVertexIndex === 0 || assetVertexIndex === assetVertexCount - 1) {
              // endpoints only
              const screenCoords = deckGL.current.viewports[0].project(position)
              const nearbyBusInfos = deckGL.current.pickMultipleObjects({
                x: screenCoords[0],
                y: screenCoords[1],
                layerIds: [BUSES_MAP_LAYER_ID],
                radius: PICKING_RADIUS_IN_PIXELS,
                depth: PICKING_DEPTH,
              })
              const nearbyBusFeatures = nearbyBusInfos.map(info => info.object)
              // TODO: Consider whether we need to filter bus features instead of this
              // TODO: This assumes that nearbyBusFeatures is in sorted order
              // TODO: Case length >= 2 happens when moving endpoint from nowhere to bus
              const newBusIndex = nearbyBusFeatures.length === 1 ? 0 : 1
              const newBusId = (nearbyBusFeatures.length) ?
                  nearbyBusFeatures[newBusIndex].properties.id :
                  makeBusId()
              const newConnection = { busId: newBusId, attributes: {} }
              dispatch(setAssetConnection(assetId, assetVertexIndex, newConnection))
            }
            break
          }
          default: {}
        }
      } else if (editType === 'addFeature') {
        const [featureIndex, feature] = getFeaturePack(event)
        if (!editingAsset.id) {
          editingAsset = makeEditingAsset(assetTypeCode)
        } else if (isAddingLine) {
          const vertexCount = feature.geometry.coordinates.length
          if (!editingAsset.connections[vertexCount - 1]) {
            editingAsset = produce(editingAsset, draft => {
              draft.connections[vertexCount - 1] = { busId: makeBusId() }
            })
          }
        }
        const assetId = editingAsset.id
        updateFeature(feature, editingAsset)
        dispatch(setAsset(editingAsset))
        dispatch(fillAssetName(assetId, feature))
        dispatch(setFocusingAssetId(assetId))
        dispatch(setSelectedAssetIndexes([featureIndex]))
        dispatch(setSketchMode(SKETCH_MODE_ADD))  // Add one at a time
      } else if (editType === 'removePosition') {
        console.log('edit remove')
        const { featureIndexes, positionIndexes } = editContext
        const { features } = updatedData
        const positionIndex = positionIndexes[0]
        const featureIndex = featureIndexes[0]
        const feature = features[featureIndex]
        const geometry =  feature['geometry']
        if (feature.properties.typeCode === ASSET_TYPE_CODE_LINE) {
          const coordinatesLength = geometry.coordinates.length
          const assetId = feature.properties.id
          if (coordinatesLength === positionIndex || positionIndex === 0) {
            // it is one endpoint of line
            dispatch(removeLineEndPoint(
              assetId, positionIndex, coordinatesLength - 1))
            dispatch(setSelectedAssetIndexes([]))
          }
        }
      }

      dispatch(setAssetsGeoJson(updatedData))
    }

    function handleAssetClick(info, event) {
      console.log('asset click', info, event)
      const targetAssetId = info.object && info.object.properties.id
      if (!targetAssetId) {
        return
      }

      if (sketchMode === SKETCH_MODE_DELETE) {
        dispatch(setSelectedAssetIndexes([]))
        dispatch(setFocusingAssetId(null))
        dispatch(setFocusingBusId(null))
        dispatch(deleteAsset(targetAssetId))
      }
      // If we are not adding a specific type of asset,
      else if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
        dispatch(setSelectedAssetIndexes([info.index]))
        dispatch(setFocusingAssetId(targetAssetId))
      }
    }

    /*
    function handleLayerDoubleClick(event) {
      console.log('layer double click', event)
    }
    */

    function handleLayerStopDragging(event) {
      console.log('layer stop dragging', event)
      /*
      // TODO: Fix side effects and make code easier to read
      const screenCoords = event.screenCoords
      console.log('*********************', event)

      const busInfos = deckGL.current.pickMultipleObjects({
        x: screenCoords[0],
        y: screenCoords[1],
        layerIds: [BUSES_MAP_LAYER_ID],
        radius: PICKING_RADIUS_IN_PIXELS,
        depth: PICKING_DEPTH,
      })
      const vertex = getPickedEditHandle(event.picks)

      if (sketchMode === SKETCH_MODE_EDIT) {
        console.log(vertex)
        console.log(busInfos)
        console.log(vertex.picks)
        console.log(busInfos.length === 0)
        let asset
        if (busInfos.length === 0 && event.picks) {
          asset = event.picks[1].object.properties
          dispatch(setAssetConnection(asset.id, 0, ''))
          console.log('== dispatched')
        } else {
          asset = event.picks[1].object.properties
          console.log(asset)
          if (!asset.typeCode === 'm') return
          console.log(busInfos[0].object.properties)
          dispatch(setAssetConnection(asset.id, 0, {
            busId: busInfos[0].object.properties.id,
          }))
        }
      }
      */
    }

    return new CustomEditableGeoJsonLayer({
      id: ASSETS_MAP_LAYER_ID,
      data: assetsGeoJson,
      mode: mapMode,
      selectedFeatureIndexes: selectedAssetIndexes,
      autoHighlight: true,
      highlightColor: colors.assetHighlight,
      pickable: true,
      stroked: false,
      getRadius: feature => {
        return ASSET_RADIUS_IN_METERS_BY_CODE[feature.properties.typeCode]
      },
      getLineWidth: ASSET_LINE_WIDTH_IN_METERS,
      getFillColor: (feature, isSelected) => {
        return isSelected ? colors.assetSelect : colors.asset
      },
      getLineColor: (feature, isSelected) => {
        return isSelected ? colors.assetSelect : colors.asset
      },
      onClick: handleAssetClick,
      onEdit: handleAssetEdit,
      // onDoubleClick: handleLayerDoubleClick,
      onStopDragging: handleLayerStopDragging,
    })
  }

  function getBusesMapLayer() {
    function handleBusClick(info, event) {
      console.log('bus click', info, event)
      const targetBusId = info.object && info.object.properties.id
      const targetAssetId = assetIdByBusId[targetBusId]

      // If we are not adding a specific type of asset,
      /*
      if (sketchMode === SKETCH_MODE_ADD) {
        const assetInfos = deckGL.current.pickMultipleObjects({
          x: info.x,
          y: info.y,
          layerIds: [ASSETS_MAP_LAYER_ID],
          radius: PICKING_RADIUS_IN_PIXELS,
          depth: PICKING_DEPTH,
        })
        console.log(assetInfos)
        if (assetInfos.length > 0 && assetInfos[0].object.properties.typeCode === 'm') {
          const asset = assetInfos[0].object.properties
          dispatch(setAssetConnection(asset.id, 0, {
            busId: targetBusId,
          }))
        }
      }
      */
      if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
        if (targetAssetId) {
          dispatch(setFocusingAssetId(targetAssetId))
          dispatch(setFocusingBusId(targetBusId))
        }
      }
    }

    return new EditableGeoJsonLayer({
      id: BUSES_MAP_LAYER_ID,
      data: busesGeoJson,
      mode: ViewMode,
      selectedFeatureIndexes: selectedBusIndexes,
      autoHighlight: true,
      highlightColor: colors.busHighlight,
      pickable: true,
      stroked: false,
      getRadius: BUS_RADIUS_IN_METERS,
      getFillColor: (feature, isSelected) => {
        return isSelected ? colors.busSelect : colors.bus
      },
      onClick: handleBusClick,
    })
  }

  return {
    mapLayers: [
      getAssetsMapLayer(),
      getBusesMapLayer(),
    ],
    handleMapKey(event) {
      event.persist()  // Populate event with extra signals
      console.log('map key', event)
      switch (event.key) {
        case 'Escape': {
          if (sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
            dispatch(setSketchMode(SKETCH_MODE_ADD))
          }
          break
        }
        case 'Delete':
        case 'Backspace': {
          if (
            sketchMode === SKETCH_MODE_ADD ||
            sketchMode === SKETCH_MODE_EDIT
          ) {
            dispatch(setFocusingAssetId(null))
            dispatch(setFocusingBusId(null))
            dispatch(setSelectedAssetIndexes([]))
            dispatch(deleteAsset(focusingAssetId))
          }
          break
        }
        default: { }
      }
    },
    handleMapClick(info, event) {
      console.log('map click', info, event)
    },
  }
}
