import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from 'nebula.gl'
import {
  setAsset,
  setAssetsGeojson,
  setFocusingAssetId,
  setMapViewState,
} from '../actions'
import {
  ADD_LINE,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
} from '../constants'
import {
  getAssetName,
  getAssetTypeId,
  getMapMode,
  getRandomAssetId,
} from '../routines'
import {
  getAssetsColor,
  getAssetsGeoJson,
  getBusesColor,
  getBusesGeoJson,
  getMapStyleName,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

const ASSETS_MAP_LAYER_ID = 'assets-geojson-layer'
const BUSES_MAP_LAYER_ID = 'buses-geojson-layer'

export default function AssetsMap(props) {
  const {
    sketchMode,
    selectedAssetIndexes,
    setSelectedAssetIndexes,
  } = props
  const dispatch = useDispatch()
  const mapStyleName = useSelector(getMapStyleName)
  const mapViewState = useSelector(getMapViewState)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const assetsColor = useSelector(getAssetsColor)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const busesColor = useSelector(getBusesColor)
  const mapLayers = []
  const mapMode = getMapMode(sketchMode)

  function handleViewStateChange({viewState}) {
    // Update the map viewport
    dispatch(setMapViewState(viewState))
  }

  function handleClick(info, event) {
    if (!info.picked) return
    const { assetId, busId } = info.object.properties
    dispatch(setFocusingAssetId(assetId))
  }

  function handleEditAssetsGeoJson({editType, editContext, updatedData}) {
    console.log('handleEditAssetsGeoJson', editType, editContext, updatedData)
    // If a feature is being added for the first time,
    if (editType === 'addFeature') {
      const features = updatedData.features
      const { featureIndexes } = editContext
      // Add an asset corresponding to the feature
      const assetId = getRandomAssetId()
      const assetTypeId = getAssetTypeId(sketchMode)
      const assetName = getAssetName(assetTypeId, assetId)
      const asset = {id: assetId, typeId: assetTypeId, name: assetName}
      dispatch(setAsset(asset))
      // Store assetId in feature
      for (let i = 0; i < featureIndexes.length; i++) {
        const featureIndex = featureIndexes[i]
        const feature = features[featureIndex]
        feature.properties.assetId = assetId
      }
      // If the new feature is a line,
      if (sketchMode === ADD_LINE) {
        // Have subsequent clicks extend the same line
        setSelectedAssetIndexes(featureIndexes)
      }
      dispatch(setFocusingAssetId(assetId))  // Show details for the new asset
    }
    dispatch(setAssetsGeojson(updatedData))  // Update geojson for assets
  }

  mapLayers.push(new EditableGeoJsonLayer({
    id: ASSETS_MAP_LAYER_ID,
    data: assetsGeoJson,
    mode: mapMode,
    pickable: true,
    stroked: false,
    selectedFeatureIndexes: selectedAssetIndexes,
    getRadius: POINT_RADIUS_IN_METERS,
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: assetsColor,
    getLineColor: assetsColor,
    onEdit: handleEditAssetsGeoJson,
  }))

  mapLayers.push(new GeoJsonLayer({
    id: BUSES_MAP_LAYER_ID,
    data: busesGeoJson,
    pickable: true,
    stroked: false,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: busesColor,
  }))

  return (
    <DeckGL
      controller={true}
      layers={mapLayers}
      viewState={mapViewState}
      pickingRadius={PICKING_RADIUS_IN_PIXELS}
      onViewStateChange={handleViewStateChange}
      onClick={handleClick}
    >
      <StaticMap
        mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
}
