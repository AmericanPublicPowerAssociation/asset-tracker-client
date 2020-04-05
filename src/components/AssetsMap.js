import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {
  PICKING_RADIUS_IN_PIXELS,
  PICKING_DEPTH,
} from '../constants'
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
  getColors,
  getMapStyle,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap({
  sketchMode, changeSketchMode,
  selectedAssetIndexes, setSelectedAssetIndexes,
  selectedBusIndexes,
}) {
  const deckGL = useRef()
  const mapStyle = useSelector(getMapStyle)
  const mapViewState = useSelector(getMapViewState)
  const mapEditState = {}
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)
  const { handleMapMove } = useMovableMap()
  const { handleMapKey, handleMapClick, processMapEdit } = useEditableMap(
    sketchMode,
    mapEditState,
    setSelectedAssetIndexes)
  const mapLayers = [
    getAssetsMapLayer(
      assetsGeoJson,
      selectedAssetIndexes,
      colors,
      sketchMode, changeSketchMode,
      mapEditState, processMapEdit),
    getBusesMapLayer(
      busesGeoJson,
      selectedBusIndexes,
      colors),
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
