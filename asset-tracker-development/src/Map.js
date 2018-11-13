import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';


class Map extends Component {
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
                  return bounds.extend(marker.getLngLat());
              }, new mapboxgl.LngLatBounds(
                markers[0].getLngLat(), markers[0].getLngLat()));
    } else {
      return new mapboxgl.LngLatBounds([0, 0], [0, 0]);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {markers, selectedAsset} = this.props;

    this.markers.forEach((m) => m.remove())
    this.markers = markers.map((m, i) => this.addMarker(m, i, selectedAsset));
    this.markers.forEach((m) => m.addTo(this.map))

    // if markers didn't change, don't change bounds
    if ((this.markers.length !== prevProps.markers.length) || (
      this.markers.some((m, i) => m.id !== prevProps.markers[i].id)
    )) {
      const bounds = this.setBounds(this.markers);
      this.map.fitBounds(bounds, {
                  padding: 20
              });
    }
    //this.map.setMaxBounds(this.map.getBounds());
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
    fetch('http://localhost:5000/get-center.json')
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
        this.markers = [];
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
