import React, { useState } from 'react';
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { StaticMap } from 'react-map-gl'


function App() {
  const [geoJson, setGeoJson] = useState({ type: 'FeatureCollection', features: [] })
  const selectedFeatureIndexes = []
  const editableLayer = new EditableGeoJsonLayer({
    id: 'geojson',
    data: geoJson,
    mode: 'drawLineString',
    onEdit: (props) => {
      setGeoJson( props.updatedData );
      console.log(props)
    },
    onClick: props => {
      console.log('on click', props)
    }
  });

  const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0
  };

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[editableLayer]}
      onClick={(e) => {console.log('DECKGL', e)}}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;
