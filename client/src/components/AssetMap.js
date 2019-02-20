import React, { PureComponent } from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import Pin from './MarkerPin'
import 'mapbox-gl/dist/mapbox-gl.css'

import {
  KEY_PREFIX,
  MAP_STYLE,
} from '../constants'
import LINE_GEOJSON from '../datasets/line.geojson'
import METER_GEOJSON from '../datasets/meter.geojson'

class AssetMap extends PureComponent {
  state = {
    viewport: {
      longitude: -79.7919754,
      latitude: 36.0726354,
      zoom: 9,
    },
		marker: {
			longitude: -79.631300697574062,
			latitude: 36.280963128879741 
		}

  }

  onViewportChange = viewport => {
    const {width, height, ...etc} = viewport
    this.setState({viewport: etc})
  }

	onMarkerDragEnd = (event) => {
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      }
    });
	}; 

  render () {
    const {
      selectedAssetTypeIds,
    } = this.props
    const {
      viewport, 
			marker,
    } = this.state
    const mapSources = {
      [KEY_PREFIX + 'l']: {type: 'geojson', data: LINE_GEOJSON},
      [KEY_PREFIX + 'm']: {type: 'geojson', data: METER_GEOJSON},
    }
    const mapLayers = selectedAssetTypeIds
      .filter(typeId => KEY_PREFIX + typeId in mapSources)
      .map(typeId => {
        const isLine = typeId === 'l'
        return {
          id: KEY_PREFIX + typeId,
          type: isLine  ? 'line' : 'circle',
          source: KEY_PREFIX + typeId,
          paint: isLine ? {
            'line-width': ['get', 'width'],
            'line-color': 'yellow',
            'line-opacity': 0.8,
          } : {
            'circle-radius': ['get', 'radius'],
            'circle-color': 'blue',
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.8,
          },
        }
      })
    const mapStyle = MAP_STYLE.mergeDeep({
      sources: mapSources,
      layers: mapLayers})
    return (
      <ReactMapGL
        width='100%'
        height='100%'
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => this.onViewportChange(viewport)}
      >
          <Marker 
						draggable
            longitude={marker.longitude}
            latitude={marker.latitude}
						onDragEnd={this.onMarkerDragEnd}
          >
            <Pin />
          </Marker>
      </ReactMapGL>
    )
  }
}

export default AssetMap
