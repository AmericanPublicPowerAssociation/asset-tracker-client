import React, { PureComponent } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import AssetMapMarker from './AssetMapMarker'

class AssetMap extends PureComponent {
  state = {
    /*
    longitude: -79.62399908012085,
    latitude: 36.1931536309396,
    zoom: 13,
    */
    pitch: 0,
    bearing: 0,
  }

  onViewportChange = viewport => {
    console.log(viewport)
    const {longitude, latitude, zoom, pitch, bearing} = viewport
    const {
      setMapViewport,
    } = this.props
    // this.setState({pitch, bearing})
    setMapViewport({longitude, latitude, zoom})
  }

  onClick = event => {
    const {
      // Get local variables
      onSelect,
      // Get global variables
      setSelectedAssets,
      setFocusingAsset,
    } = this.props
    const assetIds = [...new Set(
      event.features &&
      event.features.map(f => f.properties.id))]
    const assetCount = assetIds.length
    if (assetCount === 0) {
      setSelectedAssets({ids: []})
      return
    } else if (assetCount > 1) {
      setSelectedAssets({ids: assetIds})
    }
    setFocusingAsset({id: assetIds[0]})
    onSelect()
  }

  getCursor = ({isHovering}) => {
    return isHovering ? 'pointer' : 'all-scroll'
  }

  render () {
    const {
      mapStyle,
      mapViewport,
      interactiveLayerIds,
      focusingAssetId,
      focusingAssetLocation,
      locatingAssetId,
      locatingAssetLocation,
      updateAssetLocation,
    } = this.props
    const {
      /*
      longitude,
      latitude,
      zoom,
      */
      pitch,
      bearing,
    } = this.state
    const {
      longitude,
      latitude,
      zoom,
    } = mapViewport
    console.log(mapViewport.toJS())
    return (
      <ReactMapGL
        width='100%'
        height='100%'
        longitude={longitude}
        latitude={latitude}
        zoom={zoom}
        pitch={pitch}
        bearing={bearing}
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
