import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';


class Map extends Component {
  addMarker(asset, index) {
      const popup = new mapboxgl.Popup()
        .setText(asset.product)
      const marker = new mapboxgl.Marker({
      })
        .setLngLat([asset.lng, asset.lat])
        .setPopup(popup)
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
    this.markers.forEach((m) => m.remove())
    this.markers = this.props.markers.map((m, i) => this.addMarker(m, i));
    this.markers.forEach((m) => m.addTo(this.map))
    const bounds = this.setBounds(this.markers);
    this.map.fitBounds(bounds, {
                padding: 20
            });
    //this.map.setMaxBounds(this.map.getBounds());
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
    this.markers = this.props.markers.map((m, i) => this.addMarker(m, i));
    const bounds = this.setBounds(this.markers);
    const center = this.markers.length > 0 ? bounds.getCenter() : [0, 0];
    this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: center,
          zoom: 8,
          minZoom: 10,
        });
    this.markers.forEach((m) => m.addTo(this.map))
    this.map.fitBounds(bounds, {
                padding: 20
            });
    //this.map.setMaxBounds(this.map.getBounds());
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
          <div onDragOver={(e) => {
                    e.preventDefault();
              }}   style={style} ref={el => this.mapContainer = el} />
        </div>
      </div>
    );
  }
}

export default Map;
