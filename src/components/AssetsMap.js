import React, { PureComponent } from 'react'
import { fromJS } from 'immutable'
import ReactMapGL, { NavigationControl, FlyToInterpolator } from 'react-map-gl'
import { withStyles } from '@material-ui/core/styles'
import AssetMapMarker from './AssetMapMarker'
import SelectedAssetMapMarker from './SelectedAssetMapMarker'
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
    padding: theme.spacing(1),
  },
})


class AssetsMap extends PureComponent {

  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    this.map = this.mapRef.getMap()
  }

  updateViewport = viewport => {
    const bounds = this.map !== undefined ? fromJS(this.map.getBounds().toArray()) :  undefined
    const {
      longitude,
      latitude,
      zoom,
      pitch,
      bearing,
      altitude,
      width,
      height,
    } = viewport
    const {
      setMapViewport,
    } = this.props
    setMapViewport({
      longitude,
      latitude,
      zoom,
      pitch,
      bearing,
      altitude,
      width,
      height,
      bounds,
    })
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
      assetById,
      selectedAssetIds,
    } = this.props
    const { longitude, latitude, zoom, pitch, bearing, transitionDuration } = mapViewport.toJS()
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
        ref={ map => this.mapRef = map }
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={this.updateViewport}
        transitionDuration={transitionDuration}
        transitionInterpolator={new FlyToInterpolator()}
      >
        <AssetMapMarker
          color={FOCUSING_COLOR}
          assetId={focusingAssetId}
          assetLocation={focusingAssetLocation}
        />
        {
          selectedAssetIds.reduce( (list, id) => {
            const curAsset = assetById.get(id)
            if (curAsset.has('location')) {
              const curLocation = curAsset.get('location')
              const curTypeId = curAsset.get('typeId')
              const curName = curAsset.get('name')
              list.push(
                <SelectedAssetMapMarker
                  name={curName}
                  assetId={id}
                  assetType={curTypeId}
                  key={id}
                  assetLocation={curLocation} />)
            }
            return list
          }, []) 
        }
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


export default withStyles(styles)(AssetsMap)
