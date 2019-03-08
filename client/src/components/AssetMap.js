import React, { PureComponent } from 'react'
import ReactMapGL, { Popup } from 'react-map-gl'
// import LINE_GEOJSON from '../datasets/line.geojson'
// import METER_GEOJSON from '../datasets/meter.geojson'
import AssetMapMarker from './AssetMapMarker'

class AssetMap extends PureComponent {
  state = {
    viewportLongitude: -79.7919754,
    viewportLatitude: 36.0726354,
    viewportZoom: 9,
    popupLongitude: null,
    popupLatitude: null,
    popupAssetIds: null,
  }

  onViewportChange = viewport => {
    const {
      longitude,
      latitude,
      zoom,
    } = viewport
    this.setState({
      viewportLongitude: longitude,
      viewportLatitude: latitude,
      viewportZoom: zoom,
    })
  }

  onClick = event => {
    const assetIds = event.features && event.features.map(f => f.properties.id)
    const assetCount = assetIds.length
    if (assetCount === 0) {
      return
    } else if (assetCount > 1) {
      const [
        popupLongitude,
        popupLatitude,
      ] = event.lngLat
      this.setState({
        popupLongitude,
        popupLatitude,
        popupAssetIds: assetIds,
      })
    }
    const { setFocusingAsset } = this.props
    setFocusingAsset({id: assetIds[0]})
  }

  onPopupClose = () => {
    this.setState({
      popupLongitude: null,
      popupLatitude: null,
      popupAssetIds: null,
    })
  }

  getCursor = ({isHovering}) => {
    return isHovering ? 'pointer' : 'all-scroll'
  }

  render () {
    const {
      mapStyle,
      interactiveLayerIds,
      focusingAssetId,
      focusingAssetLocation,
      locatingAssetId,
      locatingAssetLocation,
      updateAssetLocation,
    } = this.props
    const {
      viewportLongitude,
      viewportLatitude,
      viewportZoom,
      popupLongitude,
      popupLatitude,
      popupAssetIds,
    } = this.state
    return (
      <ReactMapGL
        width='100%'
        height='100%'
        longitude={viewportLongitude}
        latitude={viewportLatitude}
        zoom={viewportZoom}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        interactiveLayerIds={interactiveLayerIds.toJS()}
        onViewportChange={this.onViewportChange}
        onClick={this.onClick}
        getCursor={this.getCursor}
      >
        <AssetMapMarker
          color='white'
          assetId={focusingAssetId}
          assetLocation={focusingAssetLocation}
        />
        <AssetMapMarker
          draggable
          color='yellow'
          assetId={locatingAssetId}
          assetLocation={locatingAssetLocation}
          defaultLongitude={viewportLongitude}
          defaultLatitude={viewportLatitude}
          updateAssetLocation={updateAssetLocation}
        />
      {popupAssetIds &&
        <Popup
          longitude={popupLongitude}
          latitude={popupLatitude}
          onClose={this.onPopupClose}
        >
        {popupAssetIds.map(assetId => (
          <div key={assetId}>{assetId}</div>
        ))}
        </Popup>
      }
      </ReactMapGL>
    )
  }
}

export default AssetMap
