import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import { fromJS } from 'immutable'
import MAP_STYLE from '../datasets/map-style-basic-v8.json'

//import lineExample from '../datasets/example-line.geojson'

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
          points: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [
                      {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.45, 37.78]}},
                  ]
              }
          },
          lines: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [
                      {type: 'Feature', geometry: {type: 'LineString', coordinates: [[-122.45, 37.78], [-132.45, 40.78]]}},
                  ]
              }

          }
        },
        layers: [
            ...MAP_STYLE.layers,
            {
                id: 'my-layer',
                type: 'circle',
                source: 'points',
                paint: {
                    'circle-color': '#f00',
                    'circle-radius': 14
                }
            },
            {
                id: 'my-lines',
                type: 'line',
                source: 'lines',
                paint: {
                  'line-color': 'yellow',
                  'line-width': 7
                }
            }
        ]
    });

    return (
      <ReactMapGL
        //mapStyle='mapbox://styles/mapbox/satellite-v9'
        //mapStyle='mapbox://styles/mapbox/streets-v9'
        mapStyle={ mapStyle }
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    )
  }
}

export default AssetMap
