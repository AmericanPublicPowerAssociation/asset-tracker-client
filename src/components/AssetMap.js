import React, { PureComponent } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import { withStyles } from '@material-ui/core/styles'
import AssetMapMarker from './AssetMapMarker'
import {
  // STREETS_MAP_STYLE,
  DARK_MAP_STYLE,
  EDITING_COLOR,
  FOCUSING_COLOR,
  SATELLITE_STREETS_MAP_STYLE,
} from '../constants'


const styles = theme => ({
  mapToolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: theme.spacing.unit,
  },
})


class AssetMap extends PureComponent {

  updateViewport = viewport => {
    const { longitude, latitude, zoom, pitch, bearing } = viewport
    const { setMapViewport } = this.props
    setMapViewport({longitude, latitude, zoom, pitch, bearing})
  }

  render() {
    const {
      classes,
      baseMapStyleName,
      mapStyle,
      mapViewport,
      focusingAssetId,
      focusingAssetLocation,
      locatingAssetId,
      locatingAssetLocation,
      setAssetLocation,
    } = this.props
    const { longitude, latitude, zoom, pitch, bearing } = mapViewport.toJS()
    const baseMapStyle = {
      dark: DARK_MAP_STYLE,
      // streets: STREETS_MAP_STYLE,
      satelliteStreets: SATELLITE_STREETS_MAP_STYLE,
    }[baseMapStyleName]
    return(
      <ReactMapGL
        mapStyle={baseMapStyle.mergeDeep(mapStyle)}
        width='100%'
        height='100%'
        longitude={longitude}
        latitude={latitude}
        zoom={zoom}
        pitch={pitch}
        bearing={bearing}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={this.updateViewport}
      >
        <AssetMapMarker
          color={FOCUSING_COLOR}
          assetId={focusingAssetId}
          assetLocation={focusingAssetLocation}
        />
        <AssetMapMarker
          color={EDITING_COLOR}
          draggable
          assetId={locatingAssetId}
          assetLocation={locatingAssetLocation}
          defaultLongitude={longitude}
          defaultLatitude={latitude}
          setAssetLocation={setAssetLocation}
        />
        <div className={classes.mapToolbar}>
          <NavigationControl onViewportChange={this.updateViewport} />
        </div>
      </ReactMapGL>
    )
  }

}


export default withStyles(styles)(AssetMap)
