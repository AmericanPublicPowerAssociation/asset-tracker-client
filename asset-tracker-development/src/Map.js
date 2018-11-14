import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';


class Map extends Component {
  /*
   * TODO: when clicked it should call the fn "updateSelected"
   *
   *
   */
   createLayer(assets, selectedAsset, layerName) {
  const assetData = assets.map((a) => {
  const isSelected = (selectedAsset !== null && selectedAsset.id === a.id) ? 1 : 0;
    return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [a.lng, a.lat]
                },
                "properties": {
        "id": a.id,
        "selected": isSelected
                }
    }
  });

  const layer = {
    id: layerName,
    type: "circle",
    source: {
      type: 'geojson',
      data: {
        "type": "FeatureCollection",
        "features": assetData,
      }
    },
    paint: {
      "circle-color": [
        "match",
        ["get", "selected"],
        1, "red",
        "blue",
      ]
    },
  };
  return layer;
   }

  addMarker(asset, index, selectedAsset) {
      const {updateSelected} = this.props;
      const popup = new mapboxgl.Popup()
        .on('open', function(e) {
          updateSelected(asset);
        })
      const color = (selectedAsset !== null) && asset.id === selectedAsset.id ? 'red' : 'blue';
      const marker = new mapboxgl.Marker({color})
        .setLngLat([asset.lng, asset.lat])
        .setPopup(popup)

      marker.id = asset.id;
      return marker
    }

  setBounds(markers) {
    if (markers.length > 0) {
      return markers.reduce(function(bounds, marker) {
                  return bounds.extend(marker.geometry.coordinates);
              }, new mapboxgl.LngLatBounds(
                markers[0].geometry.coordinates, markers[0].geometry.coordinates));
    } else {
      return new mapboxgl.LngLatBounds([0, 0], [0, 0]);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {markers, selectedAsset} = this.props;

    const layerName = 'assets'
    const layer = this.map.getLayer(layerName)
    console.log(layer);
    if (layer) {
  this.map.removeLayer(layerName);
  this.map.removeSource(layerName);
    }
    this.markers = this.createLayer(markers, selectedAsset, layerName);
    this.map.addLayer(this.markers);

    // if markers didn't change, don't change bounds
    const points = this.markers.source.data.features;
    const prevPoints = prevProps.markers;
    if ((points.length !== prevPoints.length) || (
      points.some((m, i) => m.properties.id !== prevPoints[i].id)
    )) {
      const bounds = this.setBounds(points);
      this.map.fitBounds(bounds, {
                  padding: 20
              });
    }
    //this.map.setMaxBounds(this.map.getBounds());
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
    fetch('http://138.197.69.144:5000/get-center.json')
      .then((res) => res.json())
      .then((data) => {
        const {lat, lng} = JSON.parse(data);
        this.map = new mapboxgl.Map({
              container: this.mapContainer,
              style: 'mapbox://styles/mapbox/streets-v9',
              center: [lng, lat],
              zoom: 8,
              minZoom: 10,
            });
        this.markers = {};
      })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
          zIndex: 3,
          bottom: 0,
          height: '500px',
          overflow: 'hidden',
          top: 0,
          width: '100%'
        };

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='border rounded'
            style={style}
            ref={el => this.mapContainer = el} />
        </div>
      </div>
    );
  }
}

export default Map;
