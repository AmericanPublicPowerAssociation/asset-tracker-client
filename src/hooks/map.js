import { useDispatch, useSelector } from 'react-redux'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { ViewMode } from '@nebula.gl/edit-modes'
import {
  setAssetsGeoJson,
  setSelectedAssetId,
  setSelectedBusId,
  setHoverInfo,
  setMapViewState,
  setSelectedAssetIndexes,
  setSelectedBusIndexes,
  setSketchMode,
  // showInfoMessage,
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
  SKETCH_MODE_EDIT,
} from '../constants'
import {
  getAssetDescription,
  getMapMode,
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
  const mapColors = useSelector(getMapColors)

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
    dispatch(setHoverInfo(d))
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
    dispatch(setHoverInfo(d))
  }

  function handleAssetClick(info, event) {
    console.log('asset click', info, event)
    const targetAssetId = info.object && info.object.properties.id
    if (!targetAssetId) {
      return
    }
    if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
      dispatch(setSelectedAssetId(targetAssetId))
      dispatch(setSelectedAssetIndexes([info.index]))
      dispatch(setSelectedBusId(null))
      dispatch(setSelectedBusIndexes([]))
    }
    if (sketchMode === SKETCH_MODE_DELETE) {
      onAssetDelete()
    }
  }

  function handleBusClick(info, event) {
    console.log('bus click', info, event)
    const targetBusId = info.object && info.object.properties.id
    if (!targetBusId) {
      return
    }
    const targetAssetId = bestAssetIdByBusId[targetBusId]
    if (!targetAssetId) {
      return
    }
    if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
      dispatch(setSelectedAssetId(targetAssetId))
      dispatch(setSelectedAssetIndexes([]))
      dispatch(setSelectedBusId(targetBusId))
      dispatch(setSelectedBusIndexes([info.index]))
    }
  }

  function handleAssetEdit(event) {
    const { editType, editContext } = event
    let { updatedData } = event
    console.log('asset edit', editType, editContext, updatedData)
    switch (editType) {
      case 'addFeature': {
        // Add a feature in draw mode
        // const [featureIndex, feature] = getFeaturePack(event)
        // if (!temporaryAssetId) {
        // }
        // dispatch(addAsset())
        break
      }
      case 'addTentativePosition': {
        // Add a vertex in DrawLineStringMode or DrawPolygonMode
        break
      }
      case 'addPosition': {
        // Add a vertex in ModifyMode
        break
      }
      case 'removePosition': {
        // Remove a vertex in ModifyMode
        break
      }
      case 'finishMovePosition': {
        // Drag a vertex in ModifyMode
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
