import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  EditableGeoJsonLayer,
  TranslateMode,
  ViewMode,
} from 'nebula.gl'
import {
  setFocusingAssetId,
  setMapViewState,
} from '../actions'
import {
  ADD_LINE,
  ADD_TRANSFORMER,
  ADD_SUBSTATION,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
} from '../constants'
import {
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
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
    setSketchMode,
  } = props
  const dispatch = useDispatch()
  const mapStyleName = useSelector(getMapStyleName)
  const mapViewState = useSelector(getMapViewState)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)

  const mapLayers = []

  const selectedFeatureIndexes = []
  console.log(sketchMode)
  mapLayers.push(getAssetsMapLayer(
    sketchMode, assetsGeoJson, selectedFeatureIndexes, colors))
  mapLayers.push(getBusesMapLayer(busesGeoJson, colors))

  function handleViewStateChange({viewState}) {
    dispatch(setMapViewState(viewState))
  }

  function handleClick(info, event) {
    if (!info.picked) {
      return
    }

    const mapLayerId = info.layer.id
    const objectId = info.object.properties.id
    let assetId = null

    console.log('info', info)
    switch(mapLayerId) {
      case ASSETS_MAP_LAYER_ID: {
        assetId = objectId
        console.log('clicked assetId =', assetId)
        break
      }
      case BUSES_MAP_LAYER_ID: {
        const busId = objectId
        console.log('clicked busId =', busId)
        break
      }
      default: {
      }
    }

    dispatch(setFocusingAssetId(assetId))
  }

  return (
    <div>
      <DeckGL
        controller={true}
        pickingRadius={PICKING_RADIUS_IN_PIXELS}
        layers={mapLayers}
        viewState={mapViewState}
        onViewStateChange={handleViewStateChange}
        // onClick={handleClick}
      >
        <StaticMap
          key='static-map'
          mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}

function getAssetsMapLayer(sketchMode, assetsGeoJson, selectedFeatureIndexes, colors) {
  const color = colors.asset
  console.log('MAPPP')
  console.log(assetsGeoJson)
  let currentMode = ViewMode
  if (sketchMode === ADD_LINE) {
    currentMode = DrawLineStringMode
  }
  else if (sketchMode === ADD_TRANSFORMER) {
    currentMode = DrawPointMode
  }
  else if (sketchMode === ADD_SUBSTATION) {
    currentMode = DrawPolygonMode
  }
  return new EditableGeoJsonLayer({
    id: ASSETS_MAP_LAYER_ID,
    data: assetsGeoJson,
    pickable: true,
    stroked: false,
    selectedFeatureIndexes,
    mode: currentMode,
    // mode: ViewMode,
    // mode: DrawPointMode,
    // mode: sketchMode,
    onEdit: function({editType, editContext, updatedData}) {
      console.log('HEEYY')
      console.log(editType, editContext, updatedData)
    },
    getRadius: POINT_RADIUS_IN_METERS,
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: () => color,
    getLineColor: () => color,
  })
}

function getBusesMapLayer(busesGeoJson, colors) {
  const color = colors.bus
  return new GeoJsonLayer({
    id: BUSES_MAP_LAYER_ID,
    data: busesGeoJson,
    pickable: true,
    stroked: false,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: color,
  })
}
