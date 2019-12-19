import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {
  MAP_STYLE_BY_NAME,
  SET_MAP_VIEW_STATE,
} from '../constants'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap(props) {
  const {
    mapStyleName,
  } = props
  const mapStyle = MAP_STYLE_BY_NAME[mapStyleName]
  const mapViewState = useSelector(state => state.mapViewState)
  const dispatch = useDispatch()
  return (
    <div>
      <DeckGL
        viewState={mapViewState}
        onViewStateChange={({viewState}) => dispatch({
          type: SET_MAP_VIEW_STATE, payload: viewState})}
        controller={true}
      >
        <StaticMap
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}
