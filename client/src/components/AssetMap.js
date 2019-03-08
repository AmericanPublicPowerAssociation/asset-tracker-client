import React, { PureComponent } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
// import LINE_GEOJSON from '../datasets/line.geojson'
// import METER_GEOJSON from '../datasets/meter.geojson'
import AssetMapMarker from './AssetMapMarker'

class AssetMap extends PureComponent {
  state = {
    longitude: -79.7919754,
    latitude: 36.0726354,
    zoom: 9,
  }

  onViewportChange = viewport => {
    const {longitude, latitude, zoom} = viewport
    this.setState({longitude, latitude, zoom})
  }

  onClick = event => {
    const {
      setSelectedAssetIds,
      setFocusingAsset,
    } = this.props
    const assetIds = event.features && event.features.map(f => f.properties.id)
    const assetCount = assetIds.length
    if (assetCount === 0) {
      setSelectedAssetIds({ids: []})
      return
    } else if (assetCount > 1) {
      setSelectedAssetIds({ids: assetIds})
    }
    setFocusingAsset({id: assetIds[0]})
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
      longitude,
      latitude,
      zoom,
    } = this.state
    return (
      <ReactMapGL
        width='100%'
        height='100%'
        longitude={longitude}
        latitude={latitude}
        zoom={zoom}
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
          defaultLongitude={longitude}
          defaultLatitude={latitude}
          updateAssetLocation={updateAssetLocation}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '10px',
        }}>
          <NavigationControl onViewportChange={this.onViewportChange} />
        </div>
      </ReactMapGL>
    )
  }
}

export default AssetMap
