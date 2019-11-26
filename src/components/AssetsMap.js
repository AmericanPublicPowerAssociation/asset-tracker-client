import React, { PureComponent } from 'react'
import { fromJS } from 'immutable'
import ReactMapGL, { GeolocateControl, NavigationControl, FlyToInterpolator } from 'react-map-gl'
import { withStyles } from '@material-ui/core/styles'
import AssetMapMarker from './AssetMapMarker'
import SelectedAssetMapMarker from './SelectedAssetMapMarker'
import MapStyleSwitch from './MapStyleSwitch'
import {
  STREETS_MAP_STYLE,
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

const buttonStyle = {
  'width': '30px',
  'borderRadius': '5px',
  'marginTop': '5px',
  'background': 'white'
}


class AssetsMap extends PureComponent {

  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    this.map = this.mapRef.getMap()
  }

  updateViewport = viewport => {
    const { mapViewport, setMapViewport } = this.props
    const {
      latitude,
      longitude,
      zoom,
      pitch,
      bearing,
      altitude,
      width,
      height,
    } = viewport
    // first time it loads it will get the bounds that contains all assets
    const bounds = this.map !== undefined ? fromJS(this.map.getBounds().toArray()) : mapViewport.get('bounds')

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

  onClick = e => {
    const { setFocusingAsset, setSelectedAsset } = this.props
    const assetIds = [...new Set(
          e.features &&
          e.features.map(f => f.properties.id))]
    const assetCount = assetIds.length
    if (assetCount > 0) {
      setSelectedAsset({ids: assetIds})
      setFocusingAsset({id: assetIds[0]})
    }
  }

  render() {
    const {
      classes,
      baseMapStyleName,
      interactiveLayerIds,
      mapStyle,
      mapViewport,
      focusingAssetId,
      focusingAssetLocation,
      locatingAssetId,
      locatingAssetLocation,
      setAssetLocation,
      assetById,
      selectedAssetIds,
      setBaseMapStyleName,
    } = this.props
    const { longitude, latitude, zoom, pitch, bearing, transitionDuration } = mapViewport.toJS()
    const baseMapStyleTypes = {
      dark: {
        style: DARK_MAP_STYLE,
        nextStyleName: 'streets',
      },
      streets: {
        style: STREETS_MAP_STYLE,
        nextStyleName: 'satelliteStreets',
      },
      satelliteStreets: {
        style: SATELLITE_STREETS_MAP_STYLE,
        nextStyleName: 'dark',
      }
    }
    const mapStyleType = baseMapStyleTypes[baseMapStyleName]
    const baseMapStyle = mapStyleType['style']
    const nextBaseMapStyleName = mapStyleType['nextStyleName']
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
        transitionInterpolator={new FlyToInterpolator() }
        interactiveLayerIds={interactiveLayerIds.toJS()}
        onClick={this.onClick}
      >
        {selectedAssetIds.reduce((list, id) => {
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
        }, [])}
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
          <GeolocateControl
            style={buttonStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true} />
          <MapStyleSwitch
            style={buttonStyle}
            curBaseMapStyleName={baseMapStyleName}
            nextBaseMapStyleName={nextBaseMapStyleName}
            setBaseMapStyleName={setBaseMapStyleName} />
        </div>
      </ReactMapGL>
    )
  }

}


export default withStyles(styles)(AssetsMap)
