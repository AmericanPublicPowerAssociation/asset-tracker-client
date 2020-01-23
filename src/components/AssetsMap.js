import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from 'nebula.gl'
import {
  setAssetsGeojson,
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
  getMapMode,
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

  function handleEditAssetsGeoJson({editType, editContext, updatedData}) {
    if (editType === 'addFeature') {
      if (sketchMode === ADD_LINE) {
        const { featureIndexes } = editContext
        // Continue drawing with the same line
        setSelectedAssetIndexes(featureIndexes)
      }
    }
    // Update geojson for assets
    dispatch(setAssetsGeojson(updatedData))
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
    >
      <StaticMap
        mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
}
