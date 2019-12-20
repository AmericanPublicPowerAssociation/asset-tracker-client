import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import {
  MAP_STYLE_BY_NAME,
  SET_MAP_VIEW_STATE,
} from '../constants'
import {
  getAssetsGeoJson,
  getBusesGeoJson,
  getIsMapStyleBright,
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
  const isMapStyleBright = useSelector(getIsMapStyleBright) 

  const mapLayers = []
  mapLayers.push(getAssetsMapLayer(assetsGeoJson, isMapStyleBright))
  mapLayers.push(getBusesMapLayer(busesGeoJson, isMapStyleBright))

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

function getAssetsMapLayer(assetsGeoJson, isMapStyleBright) {
  const color = isMapStyleBright ?
    [0, 0, 0, 127] :
    [255, 255, 255, 127]
  return new EditableGeoJsonLayer({
    id: 'assets-geojson-layer',
    data: assetsGeoJson,
    pickable: true,
    getRadius: 10,
    getLineWidth: 5,
    getFillColor: color,
    getLineColor: color,
  })
}

function getBusesMapLayer(busesGeoJson, isMapStyleBright) {
  const color = [0, 255, 255, 127]
  return new GeoJsonLayer({
    id: 'buses-geojson-layer',
    data: busesGeoJson,
    pickable: true,
    getRadius: 5,
    getLineWidth: 2,
    getFillColor: color,
    getLineColor: color,
  })
}
