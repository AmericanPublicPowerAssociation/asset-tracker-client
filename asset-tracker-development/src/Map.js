import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'



class Map extends Component {
  
  componentDidUpdate() {
    this.markers.forEach((m) => m.remove())
    this.markers = this.props.markers.map((m, i) => {
      const marker = new mapboxgl.Marker({
        draggable: true, 
      })
        .setLngLat([m.lng,m.lat])
        .addTo(this.map);
      marker.index = i
      marker.on('dragend', this.props.updateCoords);
      return marker
    });
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
    const center = [-73.935242,40.730610];
    this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: center,
          zoom: 10
        });
    this.markers = [];
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
      const style = {
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            bottom: 0,
            height: '300px',
            width: '100%'
          };

      return <div style={style} ref={el => this.mapContainer = el} />;
    }
}


export default Map;
