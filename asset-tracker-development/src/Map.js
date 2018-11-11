import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';


class Map extends Component {
  addMarker(asset, index, selected_asset_id) {
      const {updateSelected} = this.props;
      const popup = new mapboxgl.Popup()
        .on('open', function(e) {
          updateSelected(asset.id);
        })
      const color = asset.id === selected_asset_id ? 'red' : 'blue';
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
    const {markers, selected_asset_id} = this.props;
    this.markers.forEach((m) => m.remove())
    this.markers = markers.map((m, i) => this.addMarker(m, i, selected_asset_id));
    this.markers.forEach((m) => m.addTo(this.map))
    if (this.markers.length !== prevProps.markers.length) {
      const bounds = this.setBounds(this.markers);
      this.map.fitBounds(bounds, {
                  padding: 20
              });
    }
    //this.map.setMaxBounds(this.map.getBounds());
  }

  componentDidMount() {
    const {markers, selected_asset_id} = this.props;
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
    this.markers = markers.map((m, i) => this.addMarker(m, i, selected_asset_id));
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
