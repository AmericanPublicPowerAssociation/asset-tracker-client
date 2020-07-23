import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import PopUp from './PopUp'
import PopUpDeleteMidpoint from './PopUpDeleteMidpoint'
import {
  useEditableMap,
  useMovableMap,
} from '../hooks'
import {
  getMapStyle,
  getMapViewState,
  getOverlayMapLayers,
  getPopUpState,
  getPopUpDeleteMidpointState,
} from '../selectors'

const { REACT_APP_MAPBOX_TOKEN } = process.env
const MAP_CONTROLLER_OPTIONS = { doubleClickZoom: false }

export default function AssetsMap({
  onAssetDelete,
}) {
  const deckGL = useRef()
  const mapStyle = useSelector(getMapStyle)
  const mapViewState = useSelector(getMapViewState)
  const popUpState = useSelector(getPopUpState)
  const popUpDeleteMidpointState = useSelector(getPopUpDeleteMidpointState)
  const overlayMapLayers = useSelector(getOverlayMapLayers)
  const { handleMapMove } = useMovableMap()
  const { mapLayers, handleMapKey } = useEditableMap(deckGL, {
    onAssetDelete,
	})
  mapLayers.push(...overlayMapLayers)
  return (
    <div
      onKeyUp={handleMapKey}
    >
      <DeckGL
        ref={deckGL}
        layers={mapLayers}
        controller={MAP_CONTROLLER_OPTIONS}
        viewState={mapViewState}
        onViewStateChange={handleMapMove}
      >
        <StaticMap
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    { popUpState  &&
      <PopUp state={popUpState} />
    }
    { popUpDeleteMidpointState &&
     <PopUpDeleteMidpoint state={{ ...popUpDeleteMidpointState, mapViewState }} />
    }
    </div>
  )
}
