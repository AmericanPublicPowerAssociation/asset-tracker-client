import React, { PureComponent } from 'react'
import { Marker } from 'react-map-gl'
import { Map } from 'immutable'
import PlaceIcon from '@material-ui/icons/Place'

class AssetMapMarker extends PureComponent {
  render() {
    const {
      locatingAsset,
      defaultLongitude,
      defaultLatitude,
      updateAsset,
    } = this.props
    const locatingAssetId = locatingAsset.get('id')
    if (!locatingAssetId) return null
    const assetLocation = locatingAsset.get('location', Map({
      longitude: defaultLongitude,
      latitude: defaultLatitude}))
    const assetLongitude = assetLocation.get('longitude')
    const assetLatitude = assetLocation.get('latitude')
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
          updateAsset({
            id: locatingAssetId,
            location: {
              longitude: longitude,
              latitude: latitude,
            }
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
