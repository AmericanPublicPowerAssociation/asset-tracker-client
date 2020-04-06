import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  EditableGeoJsonLayer,
  ViewMode,
} from 'nebula.gl'
import {
  setAsset,
  setAssetsGeoJson,
  setMapViewState,
} from '../actions'
import {
  ASSETS_MAP_LAYER_ID,
  ASSET_LINE_WIDTH_IN_METERS,
  ASSET_RADIUS_IN_METERS_BY_CODE,
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
} from '../constants'
import {
  CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getMapMode,
  makeAsset,
  makeAssetId,
} from '../routines'

export function useMovableMap() {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleMapMove({viewState}) {
      // Update the map viewport
      dispatch(setMapViewState(viewState))
    },
  }), [dispatch])
}

export function useEditableMap(
  sketchMode, changeSketchMode,
  assetTypeByCode,
  assetsGeoJson, selectedAssetIndexes, setSelectedAssetIndexes,
  busesGeoJson, selectedBusIndexes,
  mapEditState,
  colors,
) {
  const dispatch = useDispatch()
  const isAddingLine = sketchMode === SKETCH_MODE_ADD_LINE
  return useMemo(() => ({
    getAssetsMapLayer() {
      const mapMode = getMapMode(sketchMode)

      function handleAssetEdit({editType, editContext, updatedData}) {
        console.log('asset edit', editType, editContext, updatedData)
        // If we have a new feature,
        if (editType === 'addFeature') {
          if (!isAddingLine) {
            mapEditState.sourceAssetId = makeAssetId()
          }
          // Update feature properties
          const { featureIndexes } = editContext
          const { features } = updatedData
          const { sourceAssetId } = mapEditState
          const sourceAssetTypeCode = getAssetTypeCode(sketchMode)
          console.log('add feature', sourceAssetId, sourceAssetTypeCode)
          for (let i = 0; i < featureIndexes.length; i++) {
            const featureIndex = featureIndexes[i]
            const feature = features[featureIndex]
            const featureProperties = feature.properties
            featureProperties.id = sourceAssetId
            featureProperties.typeCode = sourceAssetTypeCode
          }
          // Make an asset corresponding to the feature
          const sourceAssetType = assetTypeByCode[sourceAssetTypeCode]
          const asset = makeAsset(sourceAssetId, sourceAssetType)
          dispatch(setAsset(asset))

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
            // End line on double click
            changeSketchMode(SKETCH_MODE_ADD)
          }
          delete mapEditState.withDoubleClick
        }
        // Update geojson for assets
        dispatch(setAssetsGeoJson(updatedData))
      }

      function handleAssetClick(info, event) {
        console.log('asset click', info, event)
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
      if (isAddingLine) {
        if (!selectedAssetIndexes.length) {
          // Set a new asset id if we started a line
          mapEditState.sourceAssetId = makeAssetId()
        }
      }
    },
  }), [
    dispatch,
    sketchMode, changeSketchMode,
    assetTypeByCode,
    assetsGeoJson, selectedAssetIndexes, setSelectedAssetIndexes,
    busesGeoJson, selectedBusIndexes,
    mapEditState,
    colors,
    isAddingLine,
  ])
}
