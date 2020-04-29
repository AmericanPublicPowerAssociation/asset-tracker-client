import React, { useRef } from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import {
  EditableGeoJsonLayer,
} from '@nebula.gl/layers'
import {
  ViewMode,
} from '@nebula.gl/edit-modes'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap() {
  const deckGL = useRef()
  const mapViewState = {
    longitude: -93.25867591667159,
    latitude: 37.24195443746783,
    zoom: 16,
    pitch: 0,
    bearing: 0,
  }
  const mapLayers = [new GeoJsonLayer({
  // const mapLayers = [new EditableGeoJsonLayer({
    id: 'test-layer',
    mode: ViewMode,
    data: {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-93.25867591667159, 37.24177507443128],
        },
      }, {
        'type': 'Feature',
        'geometry': {
          'type':'LineString',
          'coordinates': [
            [-93.25867591667159, 37.24195443746783],
            [-93.26067148017867, 37.24524268415786],
            [-93.26058564949014, 37.246711672677236],
            [-93.2595342235564, 37.246703132129184],
          ],
        },
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [[ 
            [-93.26075731086718, 37.24263772131575],
            [-93.26085387039171, 37.240246200746924],
            [-93.25677691268905, 37.24010954013665],
            [-93.26075731086718, 37.24263772131575],
          ]],
        },
      }],
    },
    pickable: true,
    onClick: (info, event) => {
      console.log('layer click', info.object, info, event)
      const infos = deckGL.current.pickMultipleObjects({
        x: info.x,
        y: info.y,
        layerIds: ['test-layer'],
      })
      console.log(infos)
    },
    getLineWidth: 20,
    // getLineWidth: 10,
  })]

  return (
    <DeckGL
      ref={deckGL}
      controller={true}
      layers={mapLayers}
      pickingRadius={20}
      initialViewState={mapViewState}
      onClick={(info, event) => console.log(
        'map click', info.object, info, event)}
    >
      <StaticMap
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
}
