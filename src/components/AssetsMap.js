import React from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {
  useMovableMap,
} from '../hooks'
import {
  getMapStyle,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap() {
  const mapStyle = useSelector(getMapStyle)
  const mapViewState = useSelector(getMapViewState)
  const {
    handleMapMove,
  } = useMovableMap()
  return (
    <DeckGL
      controller={{ doubleClickZoom: false }}
      viewState={mapViewState}
      onViewStateChange={handleMapMove}
    >
      <StaticMap
        mapStyle={mapStyle}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
}
