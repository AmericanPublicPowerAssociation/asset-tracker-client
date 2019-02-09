import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import { fromJS } from 'immutable'
import MAP_STYLE from '../datasets/map-style-basic-v8.json'

import meterExample from '../datasets/toy-meter.json'

import 'mapbox-gl/dist/mapbox-gl.css'

class AssetMap extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100%',
      longitude: -122,
      latitude: 37,
      zoom: 8,
    }
  }

  render () {
    //const mapStyle = lineExample;
    const mapStyle = fromJS({
        ...MAP_STYLE,
        sources: {
          ...MAP_STYLE.sources,
          meters: {
              type: 'geojson',
              data: meterExample,
          },
        },
        layers: [
            ...MAP_STYLE.layers,
            {
              id: 'my-meters',
              type: 'circle',
              source: 'meters',
              paint: {
                'circle-color': 'red',
                'circle-radius': 8
              }
            }
        ]
    });

    return (

      <ReactMapGL
        //mapStyle='mapbox://styles/mapbox/satellite-v9'
        // mapStyle='mapbox://styles/mapbox/streets-v9'
        //mapStyle='mapbox://styles/invisibleroads/cjrxqr50m0q1j1fp91ydmnoqv'
        mapStyle={ mapStyle }
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    )
  }
}

export default AssetMap
