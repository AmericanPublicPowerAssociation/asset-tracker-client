import React, { PureComponent } from 'react'
import { Marker } from 'react-map-gl'
import PlaceIcon from '@material-ui/icons/Place'


class AssetMapMarker extends PureComponent {

  render() {
    const {
      color,
      draggable,
      assetId,
      assetLocation,
      defaultLongitude,
      defaultLatitude,
      setAssetLocation,
    } = this.props
    if (!assetId) return null
    const assetLongitude = assetLocation.get(0, defaultLongitude)
    const assetLatitude = assetLocation.get(1, defaultLatitude)
    if (assetLongitude === undefined) return null
    return (
      <Marker
        draggable={draggable}
        longitude={assetLongitude}
        latitude={assetLatitude}
        offsetLeft={-17}
        offsetTop={-32}
        onDragEnd={event => {
          const [ longitude, latitude ] = event.lngLat
          setAssetLocation({id: assetId, longitude, latitude})
        }}
      >
        <PlaceIcon htmlColor={color} fontSize='large' />
      </Marker>
    )
  }

}


export default AssetMapMarker
