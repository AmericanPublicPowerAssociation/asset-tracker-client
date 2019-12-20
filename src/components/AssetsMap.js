import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import {
  ViewMode,
} from '@nebula.gl/edit-modes'
import {
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  POINT_RADIUS_IN_METERS,
  SET_MAP_VIEW_STATE,
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

export default function AssetsMap(props) {
  const dispatch = useDispatch()
  const mapStyleName = useSelector(getMapStyleName)
  const mapViewState = useSelector(getMapViewState)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)

  const mapLayers = []
  mapLayers.push(getAssetsMapLayer(assetsGeoJson, colors))
  mapLayers.push(getBusesMapLayer(busesGeoJson, colors))

  return (
    <div>
      <DeckGL
        controller={true}
        layers={mapLayers}
        viewState={mapViewState}
        onViewStateChange={({viewState}) => dispatch({
          type: SET_MAP_VIEW_STATE, payload: viewState})}
      >
        <StaticMap
          mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}

function getAssetsMapLayer(
  assetsGeoJson,
  colors,
) {
  const color = colors.feature
  return new EditableGeoJsonLayer({
    id: 'assets-geojson-layer',
    data: assetsGeoJson,
    pickable: true,
    getRadius: POINT_RADIUS_IN_METERS,
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: color,
    getLineColor: color,
    mode: ViewMode,
  })
}

function getBusesMapLayer(
  busesGeoJson,
  colors,
) {
  const color = colors.bus
  return new GeoJsonLayer({
    id: 'buses-geojson-layer',
    data: busesGeoJson,
    pickable: true,
    getRadius: BUS_RADIUS_IN_METERS,
    getLineWidth: 0,
    getFillColor: color,
  })
}
