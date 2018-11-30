import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import {Row, Col} from 'react-bootstrap';

import 'mapbox-gl/dist/mapbox-gl.css';


class Map extends Component {
  componentDidMount() {
    fetch('http://18.212.1.167:5000/get-center.json')
      .then((res) => res.json())
      .then((data) => {
        const {lat, lng} = JSON.parse(data);
        const center = new mapboxgl.LngLat(lng, lat);
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2pwM2QycWdjMDJhNjNwcndmc3hkbzRkZSJ9.0NufwkqqyqJ4isDzf6U4LQ';
        this.map = new mapboxgl.Map({
              container: this.mapContainer,
              style: 'mapbox://styles/mapbox/satellite-v9',
              center: center,
              zoom: 8,
            });
        this.popup = new mapboxgl.Popup({
          closeOnClick: false
        })
        this.editedMarker = new mapboxgl.Marker({
          draggable: true
        })
        this.editedMarker.on('dragend', (e) => {
          // update assets coords to be passed to assetdetails component for saving
          const lnglat = e.target.getLngLat();
          const {lat, lng, ...updatedAsset} = this.props.selectedAsset;
          updatedAsset.lat = lnglat.lat;
          updatedAsset.lng = lnglat.lng;
          this.props.updateSelected(updatedAsset);
        })
        this.LAYERNAME = 'assets'
        this.map.on('click', this.LAYERNAME, (e) => {
          // when a point is clicked update selected asset
          // if in edit mode don't allow for changes to selected asset by clicks on map
          if (!this.props.editMode) {
            const pointId = e.features[0].properties.id
            const asset =  this.props.markers.find((m) => m.id === pointId)
            this.props.updateSelected(asset)
          }
        });
      })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  createLayer(assets, selectedAsset, map, LAYERNAME) {
    // remove layer before adding a new layer to avoid error
    if (map.getLayer(LAYERNAME)) {
      map.removeLayer(LAYERNAME);
      map.removeSource(LAYERNAME);
    }

    const assetData = assets.map((a) => {
      const isSelected = (selectedAsset.id === a.id) ? 1 : 0;
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [a.lng, a.lat]
        },
        "properties": {
          "type_id": a.type_id,
          "id": a.id,
          "selected": isSelected
        }
      }
    });
    return {
      "id": LAYERNAME,
      "type": "circle",
      "source": {
        "type": 'geojson',
        "data": {
          "type": "FeatureCollection",
          "features": assetData,
        }
      },
      "paint": {
        "circle-radius": 6,
        "circle-color": [
          "match",
          ["get", "selected"],
          1, "red",
          "blue",
        ]
      },
    };
  }

  getBounds(markers) {
    const initialCoords = [markers[0].lng, markers[0].lat];
    return markers.reduce(
      (bounds, marker) => bounds.extend([marker.lng, marker.lat]),
      new mapboxgl.LngLatBounds(initialCoords, initialCoords)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const {editMode, markers, selectedAsset} = this.props;
    const valid = Object.keys(selectedAsset).length > 0;

    // if in editmode don't include selected asset in layer, add it later as a draggable marker
    const assets = editMode ? markers.filter(
      (a) => (selectedAsset.id !== a.id)) : markers
    const layer = this.createLayer(assets, selectedAsset, this.map, this.LAYERNAME);
    this.map.addLayer(layer);

    if (valid && !editMode) {
      // show popup for selectedasset, but only if not in edit mode
      this.popup.setLngLat([selectedAsset.lng, selectedAsset.lat])
        .setHTML(selectedAsset.product)
        .addTo(this.map);
    } else {
      this.popup.remove();
    }

    if (editMode) {
      // if editing an asset use its coords else if new asset use center of map
      if (selectedAsset.id < 0 && selectedAsset.lng === '') {
        this.props.updateSelected(Object.assign({}, selectedAsset, this.map.getCenter()))
      }
      const coords = {lng: selectedAsset.lng,
        lat: selectedAsset.lat};
      this.editedMarker
        .setLngLat(coords)
        .addTo(this.map);
    } else {
        this.editedMarker.remove();
    }

    const pm = prevProps.markers;
    // if markers didn't change, don't change bounds
    if (markers.length && (markers.length !== pm.length ||
      markers.some((m, i) => m.id !== pm[i].id)) && !editMode){
      const center = this.map.getCenter();
      let bounds = new mapboxgl.LngLatBounds(center, center);
      try {
        bounds = this.getBounds(markers);
      } catch (e) {
        if (e instanceof TypeError) {
          console.error('markers should have atleast one element', e.message)
        }
      } finally {
        this.map.fitBounds(bounds, {
            padding: 20
        });
      }
    }
  }

  render() {
    const style = {
          zIndex: 3,
          bottom: 0,
          height: '500px',
          overflow: 'hidden',
          top: 0,
          width: '100%',
          borderRadius: '25px'
        };

    return (
      <Row>
        <Col lg={12}>
          <div style={style}
            ref={el => this.mapContainer = el} />
        </Col>
      </Row>
    );
  }
}


export default Map;
