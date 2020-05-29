import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import PopUp from './PopUp'
import {
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
} from '../constants'
import {
  useEditableMap,
  useMovableMap,
} from '../hooks'
import {
  getHoverInfo,
  getMapStyle,
  getMapViewState,
  getOverlayMapLayers,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap(props) {
  const deckGL = useRef()
  const mapStyle = useSelector(getMapStyle)
  const mapViewState = useSelector(getMapViewState)
  const hoverInfo = useSelector(getHoverInfo)
  const overlayMapLayers = useSelector(getOverlayMapLayers)
  const { handleMapMove } = useMovableMap()
  const { openDeleteDialogOpen } = props
  const { mapLayers, handleMapKey, handleMapClick } = useEditableMap(
    deckGL, openDeleteDialogOpen)
  mapLayers.push(...overlayMapLayers)
  return (
    <div onKeyUp={handleMapKey}
      style={{ overflowX: 'hidden', overflowY: 'hidden' }}
    >
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
    { hoverInfo &&
      <PopUp info={hoverInfo} />
    }
    </div>
  )
}
