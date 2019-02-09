import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import { fromJS } from 'immutable'
import MAP_STYLE from '../datasets/map-style-satellite-streets.json'

import meterExample from '../datasets/example-meter.geojson'
import lineExample from '../datasets/example-line.geojson'

import 'mapbox-gl/dist/mapbox-gl.css'

class AssetMap extends Component {
  constructor(props) {
    super(props);
    const mapStyle = fromJS({
        ...MAP_STYLE,
        sources: {
          ...MAP_STYLE.sources,
          'l': {
              type: 'geojson',
              data: lineExample,
          },
          'm': {
              type: 'geojson',
              data: meterExample,
          },
        },
        layers: [
          ...MAP_STYLE.layers,
        ],
    });
    this.state = {
      viewport: {
        width: '100%',
        height: '100%',
        longitude: -80,
        latitude: 35,
        zoom: 6,
      },
      mapStyle: mapStyle
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedAssetTypeIds } = this.props;
    const isSame = (
      selectedAssetTypeIds.length === prevProps.selectedAssetTypeIds.length &&
      selectedAssetTypeIds.every(function(value, index) { return value === prevProps.selectedAssetTypeIds[index]}))
    if (!isSame) {
      const style = fromJS(this.state.mapStyle)
      const defaultLayers = fromJS(MAP_STYLE).get('layers');
      const newLayers = defaultLayers.concat(selectedAssetTypeIds.map((t, i) => {
        let type = 'circle';
        let paint = {
          'circle-color': 'red',
          'circle-radius': 4
        }
        if (t === 'l') {
          type = 'line'
          paint = {
            'line-color': 'yellow',
            'line-width': ['get', 'NomV']
          }
        }
        return {
                  id: `${i}`,
                  type: type,
                  source: t,
                  paint: paint,
                }
      }))
      console.log(newLayers)
      this.setState({mapStyle: style.set('layers', newLayers)})
    }
  }

  componentDidMount() {
      const { selectedAssetTypeIds } = this.props;
      const style = fromJS(this.state.mapStyle)
      const defaultLayers = fromJS(MAP_STYLE).get('layers');
      const newLayers = defaultLayers.concat(selectedAssetTypeIds.map((t, i) => {
        let type = 'circle';
        let paint = {
          'circle-color': 'red',
          'circle-radius': 4
        }
        if (t === 'l') {
          type = 'line'
          paint = {
            'line-color': 'yellow',
            'line-width': ['get', 'NomV']
          }
        }
        return {
                  id: `${i}`,
                  type: type,
                  source: t,
                  paint: paint,
                }
      }))
      console.log(newLayers)
      this.setState({mapStyle: style.set('layers', newLayers)})
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
