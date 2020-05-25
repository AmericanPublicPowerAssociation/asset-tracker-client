import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { TextLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import {
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_VIEW,
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
  const { mapLayers, handleMapKey, handleMapClick } = useEditableMap(deckGL)

  // Option 1: Use different colors -- CAN'T SEE!
  const [hoverInfo, setHoverInfo] = useState(null)
  mapLayers.push(new EditableGeoJsonLayer({
    id: 'test1',
    mode: SKETCH_MODE_VIEW,
    data: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          color: [128, 0, 0, 128],
        },
        geometry: {
          type: 'Point',
          coordinates: [-93.25867591667159, 37.24177507443128],
        },
      }, {
        type: 'Feature',
        properties: {
          color: [255, 0, 0, 128],
        },
        geometry: {
          type: 'Point',
          coordinates: [-93.25951276588422, 37.24660918603532],
        },
      }],
    },
    getRadius: 10,
    getFillColor: feature => feature.properties.color,
    getLineColor: feature => feature.properties.color,
    onHover: function (info) {
      const { object } = info
      console.log(info)
      if (object) {
        setHoverInfo(info)
      } else {
        setHoverInfo(null)
      }
    },
  }))

  // Option 2: Flash popup and on hover
  /*
  mapLayers.push(new EditableGeoJsonLayer({
    id: 'test2',
    mode: SKETCH_MODE_VIEW,
    // use popup
  }))
  */

  // Option 3: Use text layer
  mapLayers.push(new TextLayer({
    id: 'test3',
    mode: SKETCH_MODE_VIEW,
    data: [{
      name: 'XYZ',
      coordinates: [-93.25951276588422, 37.24660918603532],
    }],
    getPosition: d => d.coordinates,
    getText: d => d.name,
    getSize: 32,
    getColor: [255, 255, 255, 255],
  }))

  // Option 4: Use animation (DOES NOT SEEM TO WORK
  const [selectedTest4Indices, setSelectedTest4Indices] = useState([])
  mapLayers.push(new EditableGeoJsonLayer({
    id: 'test4',
    mode: SKETCH_MODE_VIEW,
    selectedFeatureIndexes: selectedTest4Indices,
    data: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          color: [128, 0, 0, 128],
        },
        geometry: {
          type: 'Point',
          coordinates: [-93.26267777252177, 37.24519143985544],
        },
      }],
    },
    onClick: function (info, event) {
      setSelectedTest4Indices([info.index])
    },
    pickable: true,
    getRadius: 10,
    getFillColor: (feature, isSelected) =>
      isSelected ? [255, 255, 255, 255] : feature.properties.color,
    transitions: {
      getFillColor: 10000,
    },
  }))

  let hoverPopUp
  if (hoverInfo) {
    hoverPopUp = (
      <div className='tooltip' style={{ left: hoverInfo.x, top: hoverInfo.y }}>
        HOVER
        {hoverInfo.object.properties.color}
      </div>
    )
  }

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
        {hoverPopUp}
      </DeckGL>
    </div>
  )
}
