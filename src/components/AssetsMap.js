import React from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {
  useEditableMap,
  useMovableMap,
} from '../hooks'
import {
  getAssetsMapLayer,
  getBusesMapLayer,
} from '../routines'
import {
  getAssetsGeoJson,
  getBusesGeoJson,
  getMapStyle,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap({
  sketchMode,
}) {
  const mapStyle = useSelector(getMapStyle)
  const mapViewState = useSelector(getMapViewState)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const { handleMapMove } = useMovableMap()
  const { handleMapKey } = useEditableMap()
  const mapLayers = [
    getAssetsMapLayer(assetsGeoJson, sketchMode),
    getBusesMapLayer(busesGeoJson),
  ]
  return (
    <div onKeyUp={handleMapKey}>
      <DeckGL
        layers={mapLayers}
        controller={{ doubleClickZoom: false }}
        viewState={mapViewState}
        onViewStateChange={handleMapMove}
      >
        <StaticMap
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}
