import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'

class AssetMap extends Component {
  state = {
    viewport: {
      // width: '100%',
      // height: '100%',
      longitude: -122,
      latitude: 37,
      zoom: 8,
    }
  }

  render () {
    console.log(process.env)
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    )
  }
}

export default AssetMap
