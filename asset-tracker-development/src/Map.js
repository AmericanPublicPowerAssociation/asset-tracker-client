import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import {Row, Col} from 'react-bootstrap';


class Map extends Component {
  createLayer(assets, selectedAsset, layerName) {
    const assetData = assets.map((a) => {
      const isSelected = (selectedAsset && selectedAsset.id === a.id) ? 1 : 0;
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

    return {
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

  addMarker(asset, index, selectedAsset) {
      const {updateSelected} = this.props;
      const popup = new mapboxgl.Popup()
        .on('open', function(e) {
          updateSelected(asset);
        })
      const color = selectedAsset && asset.id === selectedAsset.id ? 'red' : 'blue';
      const marker = new mapboxgl.Marker({color})
        .setLngLat([asset.lng, asset.lat])
        .setPopup(popup)

      marker.id = asset.id;
      return marker
    }

  setBounds(markers) {
    if (markers.length > 0) {
      const initialCoords = [markers[0].lng, markers[0].lat];
      return markers.reduce(function(bounds, marker) {
                  return bounds.extend([marker.lng, marker.lat]);
              }, new mapboxgl.LngLatBounds(
                initialCoords, initialCoords));
    } else {
      return new mapboxgl.LngLatBounds([0, 0], [0, 0]);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {editMode, markers, selectedAsset, updateSelected} = this.props;

    const layerName = 'assets'
    const layer = this.map.getLayer(layerName)

    if (layer) {
      this.map.removeLayer(layerName);
      this.map.removeSource(layerName);
      this.map.off('click', layerName)
    }
    if (editMode) {
      if (!this.editedMarker) {
        this.editedMarker = new mapboxgl.Marker({draggable: true})
        const coords = selectedAsset.id ? [
          selectedAsset.lng, selectedAsset.lat] : this.map.getCenter();
        this.editedMarker
          .setLngLat(coords)
          .addTo(this.map);
        this.editedMarker.on('dragend', (e) => {
          const {lat, lng, ...updatedAsset} = selectedAsset;
          const [new_lng, new_lat] = e.target.getLngLat().toArray();
          updatedAsset.lat = new_lat;
          updatedAsset.lng = new_lng;
          updateSelected(updatedAsset);
        })
      }
    } else {
      if (this.editedMarker) {
        this.editedMarker.remove();
      }

      // if markers didn't change, don't change bounds
      const prevPoints = prevProps.markers;
      const didChange = ((markers.length !== prevPoints.length) || (
        markers.some((m, i) => m.id !== prevPoints[i].id)
      ))


      this.layer = this.createLayer(markers, selectedAsset, layerName);
      this.map.on('click', layerName, (e) => {
        const pointId = e.features[0].properties.id
        const asset =  this.props.markers.find((m) => m.id === pointId)
        updateSelected(asset)
      });
      this.map.addLayer(this.layer);
      if (selectedAsset) {
        this.popup
          .setLngLat(
            [selectedAsset.lng, selectedAsset.lat])
          .setHTML(selectedAsset.product)
          .addTo(this.map);
      }
      else {
        this.popup.remove();
      }

      // if markers didn't change, don't change bounds
      if (didChange && markers.length){
        const bounds = this.setBounds(markers);
        this.map.fitBounds(bounds, {
                    padding: 20
                });
      }
      //this.map.setMaxBounds(this.map.getBounds());
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWgtaGFsYXMiLCJhIjoiY2prdnY1Y25mMGN3cjN2cTVxa2tvbWRnZCJ9.c8uFh6KYWAi1SPF6ZRosAA';
    fetch('http://18.212.1.167:5000/get-center.json')
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
        this.popup = new mapboxgl.Popup({
          closeOnClick: false
        })
        this.layer = {};
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
