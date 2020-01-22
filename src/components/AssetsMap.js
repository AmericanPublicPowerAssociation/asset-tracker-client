import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {
  setMapViewState,
} from '../actions'
import {
  MAP_STYLE_BY_NAME,
} from '../constants'
import {
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
  const mapLayers = []

  function handleViewStateChange({viewState}) {
    dispatch(setMapViewState(viewState))
  }

  return (
    <DeckGL
      controller={true}
      layers={mapLayers}
      viewState={mapViewState}
      onViewStateChange={handleViewStateChange}
    >
      <StaticMap
        mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
}
