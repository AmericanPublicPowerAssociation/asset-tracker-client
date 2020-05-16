import { useDispatch, useSelector } from 'react-redux'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { ViewMode } from '@nebula.gl/edit-modes'
import {
  makeAssetName,
  deleteAsset,
  removeLineEndPoint,
  setAsset, setAssetConnection,
  setAssetsGeoJson,
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
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_ASSET,
  SKETCH_MODE_DELETE,
  SKETCH_MODE_EDIT,
} from '../constants'
import {
  CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getMapMode, getPickedEditHandle,
  makeAsset,
  makeAssetId,
} from '../routines'
import {
  getAssetIdByBusId,
  getAssetIdsByBusId,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  getSelectedAssetIndexes,
  getSelectedBusIndexes,
  getSketchMode,
} from '../selectors'

let nextAssetId = makeAssetId()

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
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const selectedAssetIndexes = useSelector(getSelectedAssetIndexes)
  const selectedBusIndexes = useSelector(getSelectedBusIndexes)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const colors = useSelector(getColors)

  function getAssetsMapLayer() {
    const mapMode = getMapMode(sketchMode)

    function handleAssetEdit(event) {
      const { editType, editContext, updatedData } = event
      console.log('asset edit', editType, editContext, updatedData)

      if (editType === 'addTentativePosition') {
        const { position } = editContext
        console.log('position', position)
        console.log('xy', deckGL.current.viewports[0].project(position))
        console.log('addTentativePosition', event)
      } else if (editType === 'finishMovePosition') {
        console.log('finishMovePosition', event)
      } else if (editType === 'addFeature') {
        const assetId = nextAssetId
        const assetTypeCode = getAssetTypeCode(sketchMode)
        console.log('add feature', assetId, assetTypeCode)
        const { featureIndexes } = editContext
        console.assert(featureIndexes.length === 1)
        const featureIndex = featureIndexes[0]
        const { features } = updatedData
        const feature = features[featureIndex]
        const featureProperties = feature.properties
        featureProperties.id = assetId
        featureProperties.typeCode = assetTypeCode
        dispatch(makeAssetName(feature))
        dispatch(setAsset(makeAsset(feature)))
        dispatch(setSelectedAssetIndexes(featureIndexes))
        dispatch(setFocusingAssetId(assetId))
        nextAssetId = makeAssetId()
        // Prevent adding multiple assets by mistake
        dispatch(setSketchMode(SKETCH_MODE_ADD))
      }
      else if (editType === 'removePosition') {
        console.log('edit remove')
        const { featureIndexes, positionIndexes, position } = editContext
        const { features } = updatedData
        const positionIndex = positionIndexes[0]
        const featureIndex = featureIndexes[0]
        const feature = features[featureIndex]
        const geometry =  feature['geometry']
        if (feature.properties.typeCode === 'l') {
          const coordinatesLength = geometry.coordinates.length
          const assetId = feature.properties.id
          if (coordinatesLength === positionIndex || positionIndex === 0) {
            // it is one endpoint of line
            // dispatch(setAssetConnection(assetId, positionIndex, ''))
            // dispatch(removeLineEndPoint(assetId, positionIndex, ''))
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
      else if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
        dispatch(setFocusingAssetId(targetAssetId))
        dispatch(setFocusingBusId(targetBusId))
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
        default: { }
      }
    },
    handleMapClick(info, event) {
      console.log('map click', info, event)
    },
  }
}
