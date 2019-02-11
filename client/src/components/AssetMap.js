import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  KEY_PREFIX,
  MAP_STYLE,
} from '../constants'
import LINE_GEOJSON from '../datasets/toy-line.geojson'
import METER_GEOJSON from '../datasets/toy-meter.geojson'
// import LINE_GEOJSON from '../datasets/line.geojson'
// import METER_GEOJSON from '../datasets/meter.geojson'

class AssetMap extends Component {
  state = {
    viewport: {
      longitude: -79.7919754,
      latitude: 36.0726354,
      // zoom: 9,
      zoom: 3,
    },
    mapStyle: MAP_STYLE.mergeDeep({
      sources: {
        [KEY_PREFIX + 'l']: {type: 'geojson', data: LINE_GEOJSON},
        [KEY_PREFIX + 'm']: {type: 'geojson', data: METER_GEOJSON},
      },
      layers: [{
        id: KEY_PREFIX + 'l',
        type: 'line',
        source: KEY_PREFIX + 'l',
        paint: {
          'line-width': ['get', 'width'],
          'line-color': 'yellow',
          // 'line-cap': 'round',
          // 'line-join': 'round',
          'line-opacity': 0.5,
        },
      }, {
        id: KEY_PREFIX + 'm',
        type: 'circle',
        source: KEY_PREFIX + 'm',
        paint: {
          'circle-radius': ['get', 'radius'],
          'circle-color': 'blue',
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': 0.5,
        },
      }],
    }),
  }

  onViewportChange = viewport => {
    const {width, height, ...etc} = viewport
    this.setState({viewport: etc})
  }

  render () {
    /*
    const {
      selectedAssetTypeIds,
    } = this.props
    */
    const {
      mapStyle,
      viewport,
    } = this.state
    /*
    const layers = MAP_STYLE.get('layers').concat(
      selectedAssetTypeIds.map(typeId => {
        const isLine = typeId === 'l'
        return {
          id: KEY_PREFIX + typeId,
          type: isLine  ? 'line' : 'circle',
          source: KEY_PREFIX + typeId,
          paint: isLine ? {
            'line-color': 'black',
            'line-width': ['get', 'width'],
          } : {
            'circle-color': 'yellow',
            'circle-radius': ['get', 'radius'],
          },
        }
      }))
    this.setState({mapStyle: mapStyle.set('layers', layers)})
    */

    return (
      <ReactMapGL
        width='100%'
        height='100%'
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => this.onViewportChange(viewport)}
      />
    )
  }
}

export default AssetMap
