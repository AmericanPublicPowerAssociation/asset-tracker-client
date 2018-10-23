import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'bootstrap/dist/css/bootstrap.min.css';



class Map extends Component {
  componentDidMount() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
      this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-73.935242,40.730610],
            zoom: 10
          });
    }

  componentWillUnmount() {
      this.map.remove();
    }

  render() {
      const style = {
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
