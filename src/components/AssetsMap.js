import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from 'nebula.gl'
import {
  // setFocusingBusId,
  setAsset,
  setAssetsGeoJson,
  setFocusingAssetId,
  setMapViewState,
  setSelectedBusIndexes,
} from '../actions'
import {
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
} from '../constants'
import {
  getAssetTypeCode,
  getMapMode,
  makeAsset,
} from '../routines'
import {
  getAssetTypeByCode,
  getAssetIdByBusId,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  // getFocusingAssetId,
  // getFocusingBusId,
  getMapStyleName,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap(props) {
  const {
    sketchMode,
    selectedAssetIndexes,
    lineBusId,
    changeSketchMode,
    setSelectedAssetIndexes,
    setLineBusId,
    selectedBusIndexes,
  } = props
  const dispatch = useDispatch()
  const mapStyleName = useSelector(getMapStyleName)
  const mapViewState = useSelector(getMapViewState)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)
  // const focusingAssetId = useSelector(getFocusingAssetId)
  // const focusingBusId = useSelector(getFocusingBusId)
  const mapLayers = []
  const mapMode = getMapMode(sketchMode)

  function handleViewStateChange({viewState}) {
    // Update the map viewport
    dispatch(setMapViewState(viewState))
  }

  function handleAssetsGeoJsonClick(info, event) {
    const assetId = info.object.properties.id
    assetId && dispatch(setFocusingAssetId(assetId))
    if (sketchMode.startsWith(SKETCH_MODE_ADD) || info.isGuide) return
    const featureIndex = info.index
    setSelectedAssetIndexes([featureIndex])
    dispatch(setSelectedBusIndexes([]))
  }

  function handleAssetsGeoJsonEdit({editType, editContext, updatedData}) {
    // If a feature is being added for the first time,
    if (editType === 'addFeature') {
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
      }
      // If the new feature is a line,
      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        // Have subsequent clicks extend the same line
        setSelectedAssetIndexes(featureIndexes)
      } else {
        changeSketchMode(SKETCH_MODE_ADD)
      }
      dispatch(setFocusingAssetId(assetId))  // Show details for the new asset
    }
    dispatch(setAssetsGeoJson(updatedData))  // Update geojson for assets
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

    // busId && dispatch(setFocusingBusId(busId))
    assetId && dispatch(setFocusingAssetId(assetId))
  }

  mapLayers.push(new EditableGeoJsonLayer({
    id: 'assets-geojson-layer',
    data: assetsGeoJson,
    mode: mapMode,
    pickable: true,
    stroked: false,
    autoHighlight: sketchMode !== SKETCH_MODE_ADD_LINE,
    highlightColor: colors.assetHighlight,
    selectedFeatureIndexes: selectedAssetIndexes,
    getRadius: POINT_RADIUS_IN_METERS,
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    getLineColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    onClick: handleAssetsGeoJsonClick,
    onEdit: handleAssetsGeoJsonEdit,
  }))

  mapLayers.push(new EditableGeoJsonLayer({
    id: 'buses-geojson-layer',
    data: busesGeoJson,
    mode: getMapMode(),
    pickable: true,
    stroked: false,
    autoHighlight: true,
    highlightColor: colors.busHighlight,
    selectedFeatureIndexes: selectedBusIndexes,
    getRadius: BUS_RADIUS_IN_METERS,
    //getFillColor: colors.bus,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.bus
    },
    onClick: handleBusesGeoJsonClick,
  }))

  return (
    <DeckGL
      controller={true}
      layers={mapLayers}
      viewState={mapViewState}
      pickingRadius={PICKING_RADIUS_IN_PIXELS}
      onViewStateChange={handleViewStateChange}
    >
      <StaticMap
        mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
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
