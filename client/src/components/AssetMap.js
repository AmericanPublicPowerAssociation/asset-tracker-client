import React, { PureComponent } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import { Map } from 'immutable'
import AssetMapMarker from './AssetMapMarker'
import AssetMapToggleView from './AssetMapToggleView'
import { STREETS_MAP_STYLE, SATELLITE_STREETS_MAP_STYLE } from '../constants/index'

class AssetMap extends PureComponent {
  state = {
    withSatelliteImagery: false,  
    longitude: -79.62399908012085,
    latitude: 36.1931536309396,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  }

  onViewportChange = viewport => {
    const {longitude, latitude, zoom, pitch, bearing} = viewport
    this.setState({longitude, latitude, zoom, pitch, bearing})
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

  handleWithSatelliteImagery = dataFromChild => {
    this.setState({ withSatelliteImagery: dataFromChild })
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
      pitch,
      bearing,
      withSatelliteImagery,
    } = this.state
    const baseMapStyle = withSatelliteImagery ? SATELLITE_STREETS_MAP_STYLE : STREETS_MAP_STYLE

    console.log(this.state.withSatelliteImagery)
    return (
      <ReactMapGL
        width='100%'
        height='100%'
        longitude={longitude}
        latitude={latitude}
        zoom={zoom}
        pitch={pitch}
        bearing={bearing}
        mapStyle={baseMapStyle.mergeDeep(mapStyle)}
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
          <AssetMapToggleView 
            handleWithSatelliteImagery={this.handleWithSatelliteImagery}
          />
        </div>
      </ReactMapGL>
    )
  }
}

export default AssetMap
