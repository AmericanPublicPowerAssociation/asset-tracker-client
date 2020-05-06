import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
} from '../constants'
import {
  useEditableMap,
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
  const deckGL = useRef()
  const mapStyle = useSelector(getMapStyle)
  const mapViewState = useSelector(getMapViewState)
  const { handleMapMove } = useMovableMap()
  const {
    getAssetsMapLayer,
    getBusesMapLayer,
    handleMapKey,
    handleMapClick,
  } = useEditableMap()
  const mapLayers = [
    getAssetsMapLayer(),
    getBusesMapLayer(),
  ]
  return (
    <div onKeyUp={handleMapKey}>
      <DeckGL
        ref={deckGL}
        layers={mapLayers}
        pickingRadius={PICKING_RADIUS_IN_PIXELS}
        pickingDepth={PICKING_DEPTH}
        controller={{ doubleClickZoom: false }}
        viewState={mapViewState}
        onViewStateChange={handleMapMove}
        onClick={handleMapClick}
      >
        <StaticMap
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}
