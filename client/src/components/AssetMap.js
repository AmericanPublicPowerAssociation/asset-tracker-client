import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import { fromJS } from 'immutable'
import MAP_STYLE from '../datasets/map-style-satellite-streets.json'

import meterExample from '../datasets/example-meter.geojson'

import 'mapbox-gl/dist/mapbox-gl.css'

class AssetMap extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100%',
      longitude: -80,
      latitude: 35,
      zoom: 6,
    },
    mapStyle: MAP_STYLE
  }

  componentDidMount() {
    const {mapStyle} = this.state;
    console.log(mapStyle)
    const style = fromJS({
        ...mapStyle,
        sources: {
          ...mapStyle.sources,
          meters: {
              type: 'geojson',
              data: meterExample,
          },
        },
        layers: [
            ...mapStyle.layers,
            {
              id: 'my-meters',
              type: 'circle',
              source: 'meters',
              paint: {
                'circle-color': 'red',
                'circle-radius': 4
              }
            }
        ]
    });
    this.setState({mapStyle: style})
  }

  render () {
    return (
      <ReactMapGL
        //mapStyle='mapbox://styles/mapbox/satellite-v9'
        // mapStyle='mapbox://styles/mapbox/streets-v9'
        //mapStyle='mapbox://styles/invisibleroads/cjrxqr50m0q1j1fp91ydmnoqv'
        mapStyle={ this.state.mapStyle }
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    )
  }
}

export default AssetMap
