import { useDispatch, useSelector } from 'react-redux'
import { produce } from 'immer'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { ViewMode } from '@nebula.gl/edit-modes'
import {
  fillAssetName,
  setAsset,
  // setAssetConnection,
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
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  // PICKING_DEPTH,
  // PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_ASSET,
  SKETCH_MODE_ADD_LINE,
  // SKETCH_MODE_EDIT,
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
  const selectedAssetIndexes = useSelector(getSelectedAssetIndexes)
  const selectedBusIndexes = useSelector(getSelectedBusIndexes)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const colors = useSelector(getColors)
  const assetTypeCode = getAssetTypeCode(sketchMode)

  function getAssetsMapLayer() {
    const mapMode = getMapMode(sketchMode)

    function handleAssetEdit(event) {
      const { editType, editContext, updatedData } = event
      console.log('asset edit', editType, editContext, updatedData)

      if (editType === 'addTentativePosition') {
        if (!editingAsset.id) {
          editingAsset = makeEditingAsset(assetTypeCode)
          dispatch(setEditingAsset(editingAsset))
        }
        /*
        if (featureGeometryType === 'LineString') {
          console.log(editContext)
          // dispatch(setAssetConnection(asset.id, ))
          // look for nearby bus
          // add connection
        }
        // 4. if we have a line, then also add connection to bus
        */
        const { position } = editContext
        console.log('position', position)
        console.log('xy', deckGL.current.viewports[0].project(position))
        console.log('addTentativePosition', event)
      } else if (editType === 'finishMovePosition') {
        console.log('finishMovePosition', event)
      } else if (editType === 'addFeature') {
        const [featureIndex, feature] = getFeaturePack(event)
        let asset = editingAsset
        if (!asset.id) {
          asset = makeEditingAsset(assetTypeCode)
        } else if (sketchMode === SKETCH_MODE_ADD_LINE) {
          const vertexCount = feature.geometry.coordinates.length
          asset = produce(asset, draft => {
            draft.connections[vertexCount - 1] = {
              busId: makeBusId(),
            }
          })
        }
        const assetId = asset.id
        updateFeature(feature, asset)
        dispatch(setAsset(asset))
        dispatch(fillAssetName(assetId, feature))
        dispatch(setFocusingAssetId(assetId))
        dispatch(setSelectedAssetIndexes([featureIndex]))
        dispatch(setSketchMode(SKETCH_MODE_ADD))  // Add one at a time
      }
      dispatch(setAssetsGeoJson(updatedData))
    }

    function handleAssetClick(info, event) {
      console.log('asset click', info, event)
      const targetAssetId = info.object && info.object.properties.id
      if (!targetAssetId) {
        return
      }
      // If we are not adding a specific type of asset,
      if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
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
      const screenCoords = event.screenCoords

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
