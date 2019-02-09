import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'

import lineExample from '../datasets/example-line.geojson'

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
    console.log(process.env)
    return (
      <ReactMapGL
        //mapStyle='mapbox://styles/mapbox/satellite-v9'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    )
  }
}

export default AssetMap
