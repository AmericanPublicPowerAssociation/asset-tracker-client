import React, { PureComponent } from 'react'
import { Marker } from 'react-map-gl'
import PlaceIcon from '@material-ui/icons/Place'

class AssetMapMarker extends PureComponent {
  render() {
    const {
      locatingAssetId,
      locatingAssetLocation,
      defaultLongitude,
      defaultLatitude,
      updateAssetLocation,
    } = this.props
    if (!locatingAssetId) return null
    const assetLongitude = locatingAssetLocation.get(
      'longitude', defaultLongitude)
    const assetLatitude = locatingAssetLocation.get(
      'latitude', defaultLatitude)
    return (
      <Marker
        draggable
        longitude={assetLongitude}
        latitude={assetLatitude}
        onDragEnd={event => {
          const [
            longitude,
            latitude,
          ] = event.lngLat
          updateAssetLocation({
            id: locatingAssetId,
            longitude: longitude,
            latitude: latitude,
          })
        }}
      >
        <PlaceIcon
          nativeColor='yellow'
          fontSize='large'
        />
      </Marker>
    )
  }
}

export default AssetMapMarker
