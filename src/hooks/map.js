import { useDispatch } from 'react-redux'
import {
  EditableGeoJsonLayer,
  ViewMode,
} from 'nebula.gl'
import {
  setAsset,
  setAssetsGeoJson,
  setFocusingAssetId,
  setMapViewState,
} from '../actions'
import {
  ASSETS_MAP_LAYER_ID,
  ASSET_LINE_WIDTH_IN_METERS,
  ASSET_RADIUS_IN_METERS_BY_CODE,
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_ASSET,
  SKETCH_MODE_ADD_LINE,
} from '../constants'
import {
  CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getMapMode,
  makeAsset,
  makeAssetId,
} from '../routines'

let nextAssetId = makeAssetId()

export function useMovableMap() {
  const dispatch = useDispatch()
  return {
    handleMapMove({ viewState }) {
      // Update the map viewport
      dispatch(setMapViewState(viewState))
    },
  }
}

export function useEditableMap(
  sketchMode, changeSketchMode,
  assetIdByBusId, assetTypeByCode,
  assetsGeoJson, selectedAssetIndexes, setSelectedAssetIndexes,
  busesGeoJson, selectedBusIndexes,
  mapEditState,
  colors,
) {
  const dispatch = useDispatch()
  const isAddingLine = sketchMode === SKETCH_MODE_ADD_LINE
  return {
    getAssetsMapLayer() {
      const mapMode = getMapMode(sketchMode)

      function handleAssetEdit({ editType, editContext, updatedData }) {
        console.log('asset edit', editType, editContext, updatedData)
        // If we have a new feature,
        if (editType === 'addFeature') {
          // Update feature properties
          const { featureIndexes } = editContext
          const { features } = updatedData
          const assetTypeCode = getAssetTypeCode(sketchMode)
          console.log('add feature', nextAssetId, assetTypeCode)
          for (const featureIndex of featureIndexes) {
            const featureProperties = features[featureIndex].properties
            featureProperties.id = nextAssetId
            featureProperties.typeCode = assetTypeCode
          }
          // Make a new asset corresponding to the feature
          const asset = makeAsset(nextAssetId, assetTypeByCode[assetTypeCode])
          dispatch(setAsset(asset))
          dispatch(setFocusingAssetId(nextAssetId))
          nextAssetId = makeAssetId()
          if (isAddingLine) {
            // Have subsequent clicks extend the same line
            setSelectedAssetIndexes(featureIndexes)
          } else {
            // Prevent adding multiple assets by mistake
            changeSketchMode(SKETCH_MODE_ADD)
          }
        }
        if (mapEditState.withDoubleClick) {
          if (isAddingLine) {
            changeSketchMode(SKETCH_MODE_ADD)  // End line on double click
          }
          delete mapEditState.withDoubleClick
        }
        dispatch(setAssetsGeoJson(updatedData))  // Update geojson for assets
      }

      function handleAssetClick(info, event) {
        console.log('asset click', info, event)
        const targetAssetId = info.object.properties.id
        if (!targetAssetId) {
          return
        }
        // If we are not adding a specific type of asset,
        if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
          dispatch(setFocusingAssetId(targetAssetId))
        }
      }

      function handleLayerDoubleClick(event) {
        console.log('layer double click', event)
        mapEditState.withDoubleClick = true
      }

      function handleLayerStopDragging(event) {
        console.log('layer stop dragging', event)
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
        onDoubleClick: handleLayerDoubleClick,
        onStopDragging: handleLayerStopDragging,
      })
    },
    getBusesMapLayer() {
      function handleBusClick(info, event) {
        console.log('bus click', info, event)
        const targetBusId = info.object.properties.id
        const targetAssetId = assetIdByBusId[targetBusId]
        // If we are not adding a specific type of asset,
        if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
          dispatch(setFocusingAssetId(targetAssetId))
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
    },
    handleMapKey(event) {
      event.persist()
      console.log('map key', event)
      switch (event.key) {
        case 'Enter': {
          if (isAddingLine) {
            changeSketchMode(SKETCH_MODE_ADD)
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
