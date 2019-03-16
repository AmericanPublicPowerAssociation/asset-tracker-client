import React, { PureComponent } from 'react'
import { Marker } from 'react-map-gl'
import PlaceIcon from '@material-ui/icons/Place'

class AssetMapMarker extends PureComponent {
  render() {
    const {
      draggable,
      color,
      assetId,
      assetLocation,
      defaultLongitude,
      defaultLatitude,
      updateAssetLocation,
    } = this.props
    if (!assetId) return null
    const assetLongitude = assetLocation.get(
      'longitude', defaultLongitude)
    const assetLatitude = assetLocation.get(
      'latitude', defaultLatitude)
    if (!assetLongitude) return null
    return (
      <Marker
        draggable={draggable}
        longitude={assetLongitude}
        latitude={assetLatitude}
        offsetLeft={-17}
        offsetTop={-32}
        onDragEnd={event => {
          const [
            longitude,
            latitude,
          ] = event.lngLat
          updateAssetLocation({
            id: assetId,
            longitude: longitude,
            latitude: latitude,
          })
        }}
      >
        <PlaceIcon
          nativeColor={color}
          fontSize='large'
        />
      </Marker>
    )
  }
}

export default AssetMapMarker
