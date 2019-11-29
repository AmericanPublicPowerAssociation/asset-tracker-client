import React, { useState } from 'react'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
// import { DrawPolygonMode } from '@nebula.gl/edit-modes'
import { StaticMap } from 'react-map-gl'
import { GEOJSON, VIEW_STATE } from '../constants'

function AssetsMap(props) {
  const {
    isSketching,
    setAssets,
  } = props
  const [geoJson, setGeoJson] = useState(GEOJSON)

  const layers = []

  const selectedFeatureIndexes = []

  if (isSketching) {
    layers.push(new EditableGeoJsonLayer({
      id: 'editable-geojson-layer',
      data: geoJson,
      selectedFeatureIndexes: selectedFeatureIndexes,
      onEdit: ({editType, editContext, updatedData}) => {
        console.log(editType)
        console.log(JSON.stringify(editContext))
        console.log(JSON.stringify(updatedData))
        setGeoJson(updatedData)
      },
    }))
  } else {
    layers.push(new GeoJsonLayer({
      id: 'geojson-layer',
      data: geoJson,
    }))
  }

  return (
    <DeckGL
      initialViewState={VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
    </DeckGL>
  )
}

export default AssetsMap
