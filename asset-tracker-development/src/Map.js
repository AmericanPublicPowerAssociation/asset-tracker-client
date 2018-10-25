import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


class Map extends Component {
  addMarkers(asset, index) {
      const marker = new mapboxgl.Marker({
        //draggable: true,
      })
        .setLngLat([asset.lng, asset.lat])
        .addTo(this.map);
      // marker.index = index
      marker.on('dragend', this.props.updateCoords);
      return marker
    }

  setBounds(markers) {
    if (markers.length > 0) {
      console.log('here')
      return markers.reduce(function(bounds, marker) {
                  return bounds.extend(marker.getLngLat());
              }, new mapboxgl.LngLatBounds(markers[0].getLngLat(), markers[0].getLngLat()));
    } else {
      return new mapboxgl.LngLatBounds([0, 0], [0, 0]);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    debugger
    this.markers.forEach((m) => m.remove())
    this.markers = this.props.markers.map((m, i) => this.addMarkers(m, i));
    const bounds = this.setBounds(this.markers);
    this.map.fitBounds(bounds, {
                padding: 20
            });
    //this.map.setMaxBounds(this.map.getBounds());
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
    this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/satellite-v9',
          center: [0, 0],
          zoom: 10,
          minZoom: 10,
        });
    this.markers = this.props.markers.map((m, i) => this.addMarkers(m, i));
    console.log('mount')
    const bounds = this.setBounds(this.markers);
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
          bottom: 0,
          height: '500px',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          width: '100%'
        };
    return (
      <div style={style} ref={el => this.mapContainer = el} />
    );
  }
}


export default Map;
