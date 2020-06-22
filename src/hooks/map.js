import { useDispatch, useSelector } from 'react-redux'
import { produce } from 'immer'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { ViewMode } from '@nebula.gl/edit-modes'
import {
  // showInfoMessage,
  addAsset,
  deleteAssetVertex,
  insertAssetVertex,
  setAssetsGeoJson,
  setMapViewState,
  setPopUpState,
  setSelection,
  setSketchMode,
  setTemporaryAsset,
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
  getAssetDescription,
  getAssetTypeCode,
  getFeatureInfo,
  getMapMode,
  getPositionIndex,
  makeBusId,
  makeTemporaryAsset,
} from '../routines'
import {
  getAssetById,
  getAssetTypeByCode,
  getAssetsGeoJson,
  getBestAssetIdByBusId,
  getBusesGeoJson,
  getMapColors,
  getSelectedAssetIndexes,
  getSelectedBusIndexes,
  getSketchMode,
  getTemporaryAsset,
} from '../selectors'

export function useMovableMap() {
  const dispatch = useDispatch()
  return {
    handleMapMove({ viewState }) {
      dispatch(setMapViewState(viewState))
    },
  }
}

export function useEditableMap(deckGL, { onAssetDelete }) {
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const selectedAssetIndexes = useSelector(getSelectedAssetIndexes)
  const selectedBusIndexes = useSelector(getSelectedBusIndexes)
  const assetById = useSelector(getAssetById)
  const bestAssetIdByBusId = useSelector(getBestAssetIdByBusId)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetTypeCode = getAssetTypeCode(sketchMode)
  const mapColors = useSelector(getMapColors)
  const isAddingLine = sketchMode === SKETCH_MODE_ADD_LINE
  let temporaryAsset = useSelector(getTemporaryAsset)

  function getAssetsMapLayer() {
    const mapMode = getMapMode(sketchMode)

    return new EditableGeoJsonLayer({
      id: ASSETS_MAP_LAYER_ID,
      data: assetsGeoJson,
      mode: mapMode,
      selectedFeatureIndexes: selectedAssetIndexes,
      autoHighlight: true,
      highlightColor: mapColors.assetHighlight,
      pickable: true,
      stroked: false,
      getRadius: feature => {
        return ASSET_RADIUS_IN_METERS_BY_CODE[feature.properties.typeCode]
      },
      getLineWidth: ASSET_LINE_WIDTH_IN_METERS,
      getFillColor: (feature, isSelected) => {
        return isSelected ? mapColors.assetSelect : mapColors.asset
      },
      getLineColor: (feature, isSelected) => {
        return isSelected ? mapColors.assetSelect : mapColors.asset
      },
      onHover: handleAssetHover,
      onClick: handleAssetClick,
      onEdit: handleAssetEdit,
      modeConfig: { steps: 4 },
    })
  }

  function getBusesMapLayer() {
    return new EditableGeoJsonLayer({
      id: BUSES_MAP_LAYER_ID,
      data: busesGeoJson,
      mode: ViewMode,
      selectedFeatureIndexes: selectedBusIndexes,
      autoHighlight: true,
      highlightColor: mapColors.busHighlight,
      pickable: true,
      stroked: false,
      getRadius: BUS_RADIUS_IN_METERS,
      getFillColor: (feature, isSelected) => {
        return isSelected ? mapColors.busSelect : mapColors.bus
      },
      onHover: handleBusHover,
      onClick: handleBusClick,
    })
  }

  function handleMapKey(event) {
    event.persist()  // Populate event with extra signals
    console.log('map key', event)
    switch (event.key) {
      case 'Escape': {
        if (sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
          dispatch(setSketchMode(SKETCH_MODE_ADD))
        }
        break
      }
      case 'Backspace':
      case 'Delete': {
        if ([
          SKETCH_MODE_ADD,
          SKETCH_MODE_EDIT,
        ].includes(sketchMode)) {
          onAssetDelete()
        }
        break
      }
      default: { }
    }
  }

  function handleAssetHover(info) {
    const { x, y, object } = info
    let d = null
    if (object) {
      const objectProperties = object.properties
      const assetId = objectProperties.id
      const assetDescription = getAssetDescription(
        assetId, assetById, assetTypeByCode)
      const text = assetDescription
      if (text) {
        d = { x, y, text }
      }
    }
    dispatch(setPopUpState(d))
  }

  function handleBusHover(info) {
    const { x, y, object } = info
    let d = null
    if (object) {
      const objectProperties = object.properties
      const busId = objectProperties.id
      const busIndex = objectProperties.index
      const assetId = bestAssetIdByBusId[busId]
      const assetDescription = getAssetDescription(
        assetId, assetById, assetTypeByCode)
      const text = 'Bus ' + busIndex + ' of ' + assetDescription
      d = { x, y, text }
    }
    dispatch(setPopUpState(d))
  }

  function handleAssetClick(info, event) {
    console.log('asset click', info, event)
    if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
      dispatch(setSelection({ assetIndexes: [info.index] }))
    }
    if (sketchMode === SKETCH_MODE_DELETE) {
      onAssetDelete()
    }
  }

  function handleBusClick(info, event) {
    console.log('bus click', info, event)
    if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
      dispatch(setSelection({ busIndexes: [info.index] }))
    }
  }

  function handleAssetEdit(event) {
    const { editType, editContext } = event
    let { updatedData } = event
    console.log('asset edit', editType, editContext, updatedData)
    switch (editType) {
      case 'addFeature': {
        // Add a feature in draw mode
        const { feature, featureIndex } = getFeatureInfo(event)
        if (!temporaryAsset) {
          temporaryAsset = makeTemporaryAsset(assetTypeCode)
        } else if (isAddingLine) {
          // Add ending vertex
          const vertexCount = feature.geometry.coordinates.length
          const lastVertexIndex = vertexCount - 1
          if (!temporaryAsset.connections[lastVertexIndex]) {
            temporaryAsset = produce(temporaryAsset, draft => {
              draft.connections[lastVertexIndex] = { busId: makeBusId() }
            })
          }
        }
        dispatch(addAsset(temporaryAsset, feature, featureIndex))
        break
      }
      case 'addTentativePosition': {
        // Add a vertex in DrawLineStringMode or DrawPolygonMode
        if (!temporaryAsset) {
          temporaryAsset = makeTemporaryAsset(assetTypeCode)
        }
        // TODO: Review this code
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
          const temporaryAssetFeature = nearbyAssetFeatures.find(
            feature => feature.properties.guideType)
          const vertexCount = temporaryAssetFeature ?
            temporaryAssetFeature.geometry.coordinates.length : 1
          console.log('vertexCount', vertexCount)
          // Add connection to nearby bus or make a new bus
          let busId
          if (nearbyBusFeatures.length) {
            busId = nearbyBusFeatures[0].properties.id
          } else if (vertexCount === 1) {
            busId = makeBusId()
          }
          if (busId) {
            console.log('ADDING BUS HERE')
            temporaryAsset = produce(temporaryAsset, draft => {
              draft.connections[vertexCount - 1] = { busId }
            })
          }
        }
        dispatch(setTemporaryAsset(temporaryAsset))
        break
      }
      case 'addPosition': {
        // Add a vertex in ModifyMode
        const { feature } = getFeatureInfo(event)
        const addedPositionIndex = getPositionIndex(event)
        const featureProperties = feature.properties
        if (featureProperties.typeCode === ASSET_TYPE_CODE_LINE) {
          const assetId = feature.properties.id
          const afterIndex = addedPositionIndex - 1
          dispatch(insertAssetVertex(assetId, afterIndex))
        }
        break
      }
      case 'removePosition': {
        // Remove a vertex in ModifyMode
        const { feature } = getFeatureInfo(event)
        const removedPositionIndex = getPositionIndex(event)
        const featureProperties = feature.properties
        if (featureProperties.typeCode === ASSET_TYPE_CODE_LINE) {
          const vertexCount = feature.geometry.coordinates.length
          const assetId = featureProperties.id
          dispatch(deleteAssetVertex(
            assetId, removedPositionIndex, vertexCount))
        }
        break
      }
      case 'finishMovePosition': {
        // Drag a vertex in ModifyMode
        // TODO: Review this code
        break
      }
      default: { }
    }
    dispatch(setAssetsGeoJson(updatedData))
  }

  const mapLayers = [
    getAssetsMapLayer(),
    getBusesMapLayer(),
  ]

  return {
    mapLayers,
    handleMapKey,
  }
}
