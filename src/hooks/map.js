import { useDispatch, useSelector } from 'react-redux'
import {
  EditableGeoJsonLayer,
} from '@nebula.gl/layers'
import {
  ViewMode,
} from '@nebula.gl/edit-modes'
import {
  makeAssetName,
  deleteAsset,
  setAsset,
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
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_ASSET,
  SKETCH_MODE_DELETE,
} from '../constants'
import {
  // CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getMapMode,
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

export function useEditableMap() {
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const selectedAssetIndexes = useSelector(getSelectedAssetIndexes)
  const selectedBusIndexes = useSelector(getSelectedBusIndexes)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const colors = useSelector(getColors)
  return {
    getAssetsMapLayer() {
      const mapMode = getMapMode(sketchMode)

      function handleAssetEdit({ editType, editContext, updatedData }) {
        console.log('asset edit', editType, editContext, updatedData)

        // TODO: Consider handling all events here instead of using asset click, bus click, map click separately
        // TODO: Consider using deckGL ref and picking engine to detect nearby assets and buses

        if (editType === 'addFeature') {
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
          const { featureIndexes, positionIndexes } = editContext
          const { features } = updatedData
          const positionIndex = positionIndexes[0]
          const featureIndex = featureIndexes[0]
          const feature = features[featureIndex]
          const geometry =  feature['geometry']
          if (feature.properties.typeCode === 'l') {
            const coordinatesLength = geometry.coordinates.length
            if (coordinatesLength === positionIndex || positionIndex === 0) {
              // it is one endpoint of line
              console.log('endpoint')
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
          dispatch(deleteAsset(targetAssetId, assetIdsByBusId))
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

      function handleLayerStopDragging(event) {
        console.log('layer stop dragging', event)
      }
      */

      // return new CustomEditableGeoJsonLayer({
      return new EditableGeoJsonLayer({
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
        // onStopDragging: handleLayerStopDragging,
      })
    },
    getBusesMapLayer() {
      function handleBusClick(info, event) {
        console.log('bus click', info, event)
        const targetBusId = info.object && info.object.properties.id
        const targetAssetId = assetIdByBusId[targetBusId]
        // If we are not adding a specific type of asset,
        if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
          dispatch(setFocusingAssetId(targetAssetId))
          dispatch(setFocusingBusId(targetBusId))
        }
        // if we are adding a line,
        // push the bus ids to a list
        // if we the bus id count is two, then end the line with the appropriate connections
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
    },
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
