import React, { useState } from 'react'
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { StaticMap } from 'react-map-gl'

function App(props) {
  const [geojson, setGeojson] = useState({
    type: 'FeatureCollection',
    features: [],
  }) 
  const [selectedItems, setSelectedItems] = useState([])
  const [initialViewState, setInitialViewState] = useState({
    longitude: -73.897052,
    latitude: 40.780474,
    zoom: 15
  })
  const [drawMode, setDrawMode] = useState('')

  const layers = []
  layers.push(new EditableGeoJsonLayer({
    id: 'editable-geojson-layer',
    data: geojson,
    selectedFeatureIndexes: selectedItems
  }))
  return (
    <DeckGL
      initialViewState={initialViewState}
      layers={layers}>
    <StaticMap
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
}

export default App
