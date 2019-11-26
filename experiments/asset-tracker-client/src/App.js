import React, { useState } from 'react'
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { StaticMap } from 'react-map-gl'

const initialItems = {
  type: 'FeatureCollection',
  features: []
}

const viewState = {
  longitude: -73.897052,
  latitude: 40.780474,
  zoom: 15
}

function App(props) {
  const [items, setItems] = useState(initialItems) 
  const [selectedItems, setSelectedItems] = useState([])
  const [initialViewState, setInitialViewState] = useState(viewState)
  const [drawMode, setDrawMode] = useState('')

  /*
  const [geojson, setGeojson] = useState({
    type: 'FeatureCollection',
    features: [],
  })
  return (
    <DeckGL>
      <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
    </DeckGL>
  )
  */
  const layers = []
  layers.push(new EditableGeoJsonLayer({
    id: 'draw-layer',
    data: items,
    selectedFeatureIndexes: selectedItems
  }))
  return (
    <div>
      <DeckGL
        initialViewState={initialViewState}
        layers={layers}>
      <StaticMap
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}

export default App
